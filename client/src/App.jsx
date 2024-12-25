import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
// import EditProfilePage from "./pages/EditProfilePage";
// import NotFound from "./pages/NotFound";
// import CreateProfilePage from './pages/CreateProfilePage';
import { Routes, Route, Navigate } from "react-router-dom";
// import Attendance from "./pages/Attendance";
// import Results from "./pages/Results";
// import Classwork from "./pages/Classwork";
// import Room from "./pages/Room";
// import Spinner from "./components/Spinner";
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
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/edit-profile" element={<EditProfilePage />} /> */}
          {/* <Route path='/create/profile' element={<CreateProfilePage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* {/* <Route path="/room/:id" element={<Room />} /> */}
          {/* <Route path="/attendance" element={<Attendance />} /> */}
          {/* <Route path="/result" element={<Results />} /> */}
          {/* <Route path="/classwork" element={<Classwork />} /> */}
          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
      )}
    </>
  )
}

export default App
