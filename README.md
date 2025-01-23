# EduFlow: Classroom Management System  

EduFlow is a robust classroom management system designed to provide instructors with a seamless platform to manage their classes efficiently. It offers features for creating and managing rooms, assignments, attendance, and grading while enabling students to participate actively in their learning process.  

---

## Features  

### For Instructors:  
- Create rooms and manage their information.  
- Upload assignments and grade submissions.  
- Mark attendance for sessions.  
- Control room access and manage enrollment.  

### For Students:  
- Join rooms using enrollment keys.  
- Submit assignments and view grades.  
- Track attendance status.  

### General:  
- User account creation and profile management.  
- Role-based access control for instructors and students.  
- Secure login and session management.  
- Update profile details.  

---

## Development Details  

### Tech Stack  
**ERN Stack:**  
- **Express.js**: For API development and routing.  
- **React.js**: Component-based framework for the front end.  
- **Node.js**: Non-blocking architecture for efficient server-side operations.  

**Database Service:**  
- **Supabase (PostgreSQL):** Reliable database service with a generous free tier.  

**Architecture:**  
- **MVC Architecture:** Separation into Models, Views, and Controllers for modular and parallel development.  

**Version Control:**  
- **Git**: For collaborative development and source control.  

---

## Use Cases  

1. User registration and login.  
2. Profile updates, including profile picture management.  
3. Instructors can:  
   - Create and update rooms.  
   - Mark attendance and update session records.  
   - Upload and manage assignments.  
   - Grade submissions and update grades.  
4. Students can:  
   - Join rooms via enrollment keys.  
   - View attendance records.  
   - Submit assignments and view grades.  

---

## Entity Relationship Diagram (ERD) Overview  

1. **Profile Creation:** Populates Student/Instructor tables.  
2. **Room Management:** Instructor ID links to Room table records.  
3. **Enrollment:** Links Student and Room IDs in the Enrollment table.  
4. **Assignment Management:** Room ID links to Assignment table.  
5. **Submission:** Assignment ID links to Submission table.  
6. **Attendance:** Uses Session, Attendance, and Student_Attendance tables for detailed record-keeping.  

---

## Server-Side Architecture  

### Frameworks and Libraries:  
- **Express.js** for building REST APIs and handling routing.  

### Controllers:  
- **AuthenticationController**: Handles user authentication.  
- **ProfileController**: Manages user profile updates.  
- **RoomController**: Handles room creation and updates.  
- **AssignmentController**: Manages assignments.  
- **GradeController**: Handles grading operations.  
- **SessionController**: Manages attendance sessions.  
- **SubmissionController**: Handles assignment submissions.  

### Routers:  
- Authentication, Profile, Room, Assignment, Grade, Session, and Submission routers handle API endpoints and call respective controllers.  

---

## Front-End Technologies  

1. **React.js**  
   - Component-based design for reusable UI elements.  
   - React Router for seamless navigation.  
   - Redux for centralized state management.  

2. **Tailwind CSS**  
   - Utility-first CSS framework for rapid UI prototyping.  
   - Responsive design for multi-device compatibility.  

3. **ShadCN UI**  
   - Pre-designed, customizable UI components for enhanced accessibility and user experience.  

4. **Redux Persist**  
   - Maintains application state across user sessions.  

---

## Challenges Faced  

1. **Frontend and Backend Integration:**  
   - Streamlining API calls between front-end and back-end layers.  

2. **State Management:**  
   - Recording user roles (student/instructor) efficiently with Redux.  

3. **Database Design:**  
   - Creating a normalized schema to support all use cases.  

4. **Authentication and Role-Based Views:**  
   - Implementing secure login and access control for different roles.  

5. **Error Handling:**  
   - Debugging and managing errors on both client and server sides.  

---

## Learning Outcomes  

- **Database Management:** Normalization and efficient schema design.  
- **MVC Architecture:** Improved project organization and modularity.  
- **State Management:** Advanced use of Redux for global state handling.  
- **API Development:** Creating and integrating APIs for seamless operations.  
- **Error Handling:** Enhanced debugging skills and error resolution techniques.  
