# YouTube Clone - MERN Stack Application

A full-stack YouTube clone built using the MERN (MongoDB, Express.js, React.js, Node.js) stack that allows users to view, interact with, and manage videos just like the original YouTube platform.

## 🚀 Features

### Frontend Features

- **Home Page**: YouTube-style homepage with header, toggleable sidebar, toggle theme button ,create channel ,SignIn Button and video grid
- **User Authentication**: Complete registration and login system with JWT authentication
- **Video Player**: Full-featured video player with like/dislike and subscribe functionality
- **Search & Filter**: Search videos by title and filter by categories
- **Channel Management**: Create Channel and Add , Edit , Delete Videos
- **Comments System**: Add, edit, and delete comments on videos
- **Responsive Design**: Fully responsive across all devices

### Backend Features

- **RESTful API**: Well-structured API endpoints for all functionalities
- **JWT Authentication**: Secure token-based authentication system
- **Database Management**: MongoDB integration for data persistence
- **File Handling**: Video and thumbnail metadata management

## 🛠️ Technologies Used

### Frontend

- **React.js** - Frontend library for building user interfaces
- **React Router** - Client-side routing
- **Redux Toolkit** - State management for React applications
- **Axios** - HTTP client for API requests
- **TaiwlindCSS** - Styling and responsive design

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **dotenv** - For Environment Variables
- **CORS** - For Accessing the API from Front End

### Tools & Utilities

- **Git** - Version control
- **GitHub** - Code repository hosting

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

## 📁 Project Structure
```
youtube_clone/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateChannel.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── FilterButtons.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MiniSideBar.jsx
│   │   │   ├── MyChannel.jsx
│   │   │   ├── NoVideosCard.jsx
│   │   │   ├── RecommendedVideos.jsx
│   │   │   ├── SideBar.jsx
│   │   │   ├── SideBarFooter.jsx
│   │   │   └── SignUp.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│   │   ├── redux/
│   │   │   ├── searchSlice.js
│   │   │   ├── sidebarslice.js
│   │   │   ├── store.js
│   │   │   ├── themeSlice.js
│   │   │   └── userSlice.js
│   │   ├── utils/
│   │   │   ├── formatSubscribers.js
│   │   │   ├── formatViews.js
│   │   │   ├── timeAgo.js
│   │   │   ├── useChannel.js
│   │   │   └── useVideo.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── Controller/
│   │   ├── ChannelController.js
│   │   ├── commentController.js
│   │   ├── userController.js
│   │   └── videoController.js
    ├── Model/
│   │   ├── Channel.js
│   │   ├── Comment.js
│   │   ├── User.js
│   │   └── Video.js
    ├── Routes/
│   │   ├── ChannelRoute.js
│   │   ├── commentRoute.js
│   │   ├── userRoute.js
│   │   └── videoRoute.js
    ├── Middlewares/
│   │   ├── auth.js
│   │   ├── logger.js
    ├── db.js
    ├── server.js
│   └── package.json
└── README.md
```



### Frontend Features Explanation:
**Home Page**:
        Header: Hamburger Icon --- Toggle Static Sidebar
                Icon--- Youtube Icon---OnClick it routes you on Home page
                Search Bar---To search video by title.
                Theme Toggle Buttton --- Which allow you to toggle theme between dark and white
                Create Channel-- Allows you to create Channle if user don't have else it hides
                SignIn--- Allows user to Sign which show Profile Picture of user if Logged IN.
        
        SideBar: 
            It is static side bar which show use some nav links only Home Link is working
            Mini Siderbar: which shows only on desktop screen when the side bar is hidden
        
        Video Grid:
            Filters: It shows the static Filter on which if you click it filter the videos.
            VideoList: It show the list of videos fetch from backend using Custom Hooks with the useEffect.
**SignIn Page**:
        SignIn: It allow user to login using username,useremai,password.
        SingUp: It allow user to register user if not there

**Create Channel**:
        It allow user to create channel if user don't have channel
        It accept Channel Banner , Channel Name , Channel Handler , Channel Description.

**Channel Page**:
        It allow user to show channel detail and allow them to subscribe the channel
        If user is not logged in it disable the subscription button
**My Channel**
        It allow user to Add Video, Edit Video , Delete Video

**Video Player**:
        It allow user to watch video , Like , Dislike Video and Subscribe the Channel.
        If it already subscribe it show user to unsubscribe.
        It allow user to Add , Edit , Delete Comment
        If user is not logged in it disable like , dislike , subscribe button.
        It has a static recommended videos.

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5100`


## 🌐 API Endpoints

### Authentication Routes

- `POST /user/sigin` - User registration
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile (Protected)

### Video Routes

- `GET /video` - Get all videos
- `GET /video/:id` - Get specific video
- `POST /video` - Upload new video (Protected)
- `PUT /video/:id` - Update video (Protected)
- `DELETE /video/:id` - Delete video (Protected)
- `PUT like /video/like/:id` - Update video Likes (Protected)
- `PUT dislike /video/dislike/:id` - update video dislikes (Protected)

### Channel Routes

- `GET /channel/:id` - Get specific channel
- `POST /channel` - Create new channel (Protected)
- `PUT /channel/:id` - Update Subscribers


### Comment Routes

- `GET /comment/:id(videoId)` - Get comments for a video
- `POST /comment/:id(videoId)` - Add new comment (Protected)
- `PUT /comment/:id` - Edit comment (Protected)
- `DELETE /comment/:id` - Delete comment (Protected)

### MiddleWares
    auth.js-- Generate a token and verify the token
    logger.js -- Generate logs

## 📱 Application Pages

### 1. Home Page (`/`)

- Display video grid with thumbnails
- Search functionality in header
- Category filter buttons
- Toggleable sidebar navigation

### 2. Authentication Pages (`/singup`, `/signin`)

- User registration with username, email, and password
- User login with email and password
- JWT token management

### 3. Video Player Page (`/video/:id`)

- Video player with controls
- Video title and description
- Channel information
- Subscribe Video
- Like/dislike buttons
- Comments section with CRUD operations

### 4. Channel Page (`/channel/:id`)

- Channel banner and information
- List of channel videos
- Video management (Add,edit/delete) for channel owners

## 🎯 Implementation Highlights

### State Management with Redux

- **Centralized State**: Using Redux Toolkit for efficient state management
- **User Authentication**: Persistent login state across application
- **Search Functionality**: Real-time search with debounced API calls
- **Theme Management**: Dark/Light theme switching
- **Sidebar State**: Toggle functionality for responsive design

### Custom Hooks & Utilities

- **useChannel.js**: Centralized channel operations and data fetching
- **useVideo.js**: Video-related operations and state management
- **Formatting Utilities**: Consistent number formatting for views and subscribers
- **Time Utilities**: Human-readable timestamp conversion

### Responsive Design Implementation

- **Mobile-First Approach**: Optimized for mobile devices
- **Adaptive Layouts**: Components adjust based on screen size
- **Toggle Sidebar**: Space-efficient navigation on smaller screens
- **Grid System**: Responsive video grid layout

### Error Handling & UX

- **Loading States**: Smooth loading indicators during data fetching
- **Error Boundaries**: Graceful error handling with ErrorState component
- **Empty States**: User-friendly messages when no content is available
- **Form Validation**: Client-side validation for user inputs


## 🔒 Authentication Flow

1. **Registration**: Users create account with username, email, and password
2. **Login**: Users authenticate with email and password
3. **JWT Token**: Server generates JWT token upon successful login
4. **Protected Routes**: Token required for creating channels, uploading videos, and commenting
5. **Token Verification**: Middleware verifies JWT tokens for protected endpoints

## 🎨 UI/UX Features

- **YouTube-like Interface**: Familiar design patterns matching YouTube
- **Responsive Grid Layout**: Video thumbnails arranged in responsive grid
- **Interactive Elements**: Hover effects, button animations
- **Dark/Light Theme**: Modern UI with consistent color scheme
- **Mobile-First Design**: Optimized for mobile devices

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Majid0899/youtube_clone.git
cd youtube_clone
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create environment variables file
touch .env

# Add the following to your .env file:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# PORT=5000

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install frontend dependencies
npm install

# Start the React development server
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5100`


## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Majid**

- GitHub: [@Majid0899](https://github.com/Majid0899)
- Project Link: [https://github.com/Majid0899/youtube_clone](https://github.com/Majid0899/youtube_clone)

## 🙏 Acknowledgments

- YouTube for UI/UX inspiration
- MERN stack community for resources and tutorials
- MongoDB documentation for database design patterns

## 📞 Support

If you have any questions or run into issues, please create an issue on GitHub or contact the project maintainer.

---

**⭐ If you found this project helpful, please give it a star on GitHub!**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Majid0899/youtube_clone.git
cd youtube_clone
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create environment variables file
touch .env

# Add the following to your .env file:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# PORT=5000

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install frontend dependencies
npm install

# Start the React development server
npm start
```

The application will be available at:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
