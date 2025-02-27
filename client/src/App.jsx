import React from "react";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import AboutPage from "@/pages/AboutPage";
import CoursesPage from "@/pages/CoursesPage";
import StudentAttendancePage from "@/pages/StudentAttendancePage";
import InstructorAttendancePage from "@/pages/InstructorAttendancePage";
import Spinner from "@/components/Spinner";
import Room from "./pages/Room";
import EnrolledStudentsPage from "./pages/EnrolledStudentsPage";
import InstructorResultsPage from "./pages/InstructorResultsPage";
import StudentResultsPage from "./pages/StudentResultsPage";
import NotFoundPage from "@/pages/NotFoundPage";
// import EditProfilePage from "./pages/EditProfilePage";
import CreateProfilePage from './pages/CreateProfilePage';
import { Routes, Route, Navigate } from "react-router-dom";
// import Results from "./pages/Results";
import Classwork from "./pages/Classwork";
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rooms" element={<CoursesPage />} />
          <Route path="/student/attendance" element={<StudentAttendancePage />} />
          <Route path="/view-students" element={<EnrolledStudentsPage />}/>
          <Route path="/instructor/attendance" element={<InstructorAttendancePage />} />
          <Route path='/instructor/results' element={<InstructorResultsPage />} />
          <Route path='/student/results' element={<StudentResultsPage />} />
          {/* <Route path="/edit-profile" element={<EditProfilePage />} /> */}
          <Route path='/create/profile' element={<CreateProfilePage />} />
          {/* <Route path="/room/:id" element={<Room />} /> */}
          {/* <Route path="/result" element={<Results />} /> */}
          <Route path="/classwork" element={<Classwork />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      )}
    </>
  )
}

export default App
