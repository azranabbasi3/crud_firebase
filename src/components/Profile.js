import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../db/db";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("accessToken");

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        navigate("/login");
      }else{
        setUser(user);
      }
    });
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
 
  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1>Profile</h1>
      <h1>{user?.displayName}</h1>
      <h1>{user?.email}</h1>
      <img src={user?.photoURL} alt="helo" />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default Profile;
