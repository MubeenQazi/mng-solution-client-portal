import React from 'react';
import {useSelector} from "react-redux";
 const Dashboard = () => {
   const auth =  useSelector((state: any) => state.auth);
     const heading = auth.user.userType === "admin" && auth.user.userType;
    return (
        <div className="App-Dashboard">
            <h1 style={{textTransform: "capitalize"}}>Welcome to {heading} Dashboard</h1>
        </div>
    )
}

export default Dashboard
