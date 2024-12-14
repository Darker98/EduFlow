import React from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import NotFound from "./pages/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Classwork from "./pages/Classwork";
import Room from "./pages/Room";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";

const App = () => {
  const { isloading } = useSelector((state) => state.loading);
  return (
    <>
      {isloading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to='/login' />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/room" element={<Room />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/result" element={<Results />} />
          <Route path="/classwork" element={<Classwork />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

export default App;
