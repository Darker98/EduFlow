import React from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import NotFound from "./pages/NotFound";
import CreateProfilePage from './pages/CreateProfilePage';
import { Routes, Route, Navigate } from "react-router-dom";
import Attendance from "./pages/Attendance";
import StudentResultsPage from "./pages/StudentResultsPage";
import Results from "./pages/Results";
import Classwork from "./pages/Classwork";
import ViewStudents from "./pages/ViewStudents";
import Room from "./pages/Room";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import ViewInstructor from "./pages/ViewInstructor";
import AttendanceStatistics from "./pages/AttendanceStatistics";

const App = () => {
  const {isloading} = useSelector((state) => state.loading);
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
          <Route path='/create/profile' element={<CreateProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/result" element={<Results />} />
          <Route path="/student/result" element={<StudentResultsPage />} />
          <Route path="/classwork" element={<Classwork />} />
          <Route path="/view-students" element={<ViewStudents />} />
          <Route path="/view-instructor" element={<ViewInstructor />} />
          <Route path="/attendance-stats" element={<AttendanceStatistics />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      )}
    </>
  )
}

export default App
