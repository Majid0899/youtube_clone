import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";

export default function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(token){
      dispatch(addUser({
        avatar:localStorage.getItem("avatar"),
        username:localStorage.getItem("username"),
        channel:localStorage.getItem("channel"),
        token:token
      }))
    }
  },[dispatch])
  
  return (
    <>
    <Layout />
    </>
  );
};
