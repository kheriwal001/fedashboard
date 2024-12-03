import React from "react";
import { Navigate,Outlet } from "react-router-dom";
//outlet check what component we are accessing and it will return that componenet if conditiona are matched

const privateComponent = ()=>{
    const auth = localStorage.getItem("user")
    return auth? <Outlet/>: <Navigate to="signup" />
}

export default privateComponent;