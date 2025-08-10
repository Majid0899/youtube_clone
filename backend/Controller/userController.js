import Users from "../Model/User.js";
import { generateToken } from "../Middlewares/auth.js";

async function handleAddUser(req, res) {
  try {
    //extract the user details from request body
    const data = req.body;

    /**
     * Create a user
     * save in the database
     */
    const user = new Users(data);
    const response = await user.save();

    /**Generate Token
     * import generatToken from auth
     * create payload for jwt token
     * pass the payload to generateToken function
     */
    const payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToken(payload);

    res.status(201).json({ response: response, token: token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server error" });
  }
}
async function handleLoginUser(req, res) {
  try {
    //Extract the useremail and password from request body;
    const { email, password } = req.body;

    //Check email and password is present or not
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    /**
     * Retreive a user from datbase
     * Compare the password
     */
    const user = await Users.findOne({ email: email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        error: "Invalid Email and password",
      });
    }
    /**Generate Token
     * import generatToken from auth
     * create payload for jwt token
     * pass the payload to generateToken function
     */
    const payload = {
      id: user.id,
      username: user.name,
    };
    const token = generateToken(payload);

    res.status(201).json({user:user,token: token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleUserProfile(req,res) {
    try {
        //extract the login user data using token verfication
        const user_data=req.user;
        //retreive the user from database;
        const user=await Users.findById(user_data.id);
        res.status(200).json({user})


    } catch (error) {
        
        res.status(500).json({ error: "Internal server error" });
    }
    
}

export { handleAddUser, handleLoginUser,handleUserProfile};