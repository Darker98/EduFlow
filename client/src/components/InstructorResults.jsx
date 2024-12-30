import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit2, Save } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux"
import { setLoading, hideLoading } from "@/redux/features/loadingSlice"
import { useNavigate } from "react-router-dom"

export default function InstructorResultsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { toast } = useToast();
    const [students, setStudents] = useState([])
    const {room_data} = useSelector(state => state.room)
    const [selectedAssignment, setSelectedAssignment] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [marks, setMarks] = useState()
    const [submissionUrls, setSubmissionUrls] = useState([])
    const {assignment_data} = useSelector(state => state.assignment)
    // const [studentGrades, setStudentGrades] = useState([])
    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const updateMarks = (studentId, newMarks) => {
        const marks = Math.min(100, Math.max(0, Number(newMarks) || 0))
        setStudents(students.map(student =>
            student.id === studentId
                ? { ...student, marks }
                : student
        ))
    }

    //handle get marks for students here
    // useEffect(() => {
    //     async function getStudentMarks(){
    //         try{
    //             const res = await axios.post('http://localhost:3000/grades/get',{
    //                 assignmentId:selectedAssignment
    //             })
    //             if(res.data.success){
    //                 setStudents(res.data.data);
    //             }
    //         }
    //         catch(err){
    //             console.log(err);
    //         }
    //     }
    // })

    const handleSave = async () => {
        const studentGrades = students.map((student) => ({
            studentId: student.id,
            marks: student.marks
        }));
        try {
            dispatch(setLoading());
            const res = await axios.post('http://localhost:3000/grades/assign/all', {
                studentGrades,
                assignmentId: selectedAssignment,
                roomId: room_data.id
            });
            dispatch(hideLoading());
            if (res.data.success) {
                setStudents((prevStudents) => prevStudents.filter(student => student.marks === undefined || student.marks === null)); // Remove students who have not been graded
                toast({
                    title: "Grades saved successfully.",
                    description: "Results updated successfully.",
                    variant:"default"
                })
                navigate('/home')
            }
        } catch (err) {
            dispatch(hideLoading());
            console.error("Error saving grades:", err);
            toast({
                title: "Error",
                description: err.resposne.data.message,
                variant: "destructive"
            })
        }
        toggleEdit();
    }

    useEffect(() => {
        async function fetchData(){
        try{
            const res = await axios.post('http://localhost:3000/submission/statuses', {
                assignmentID: selectedAssignment
            })
            const studentIds = res.data.data.map((student) => student.student_id) //this will create a list of student ids
            console.log("studentIds", studentIds)

            const submissionRes = await axios.post('http://localhost:3000/submission/url', {
                assignmentID: selectedAssignment,
                studentID: studentIds
            })
            if(submissionRes.data.success){
                setSubmissionUrls([submissionRes.data.data.publicUrl]);
                console.log("submissionUrls", submissionUrls)
            }

            if(studentIds.length > 0){
                const studentsRes = await axios.post("http://localhost:3000/profile/get",{
                    id:studentIds,
                    role:"student"
                })
                setStudents([studentsRes.data.data]);
            }
            else {
                setStudents([]); // No students submitted
            }
        }
        catch(err){
            console.log(err);
        }
     }
     fetchData();
    }, [selectedAssignment]);

//     const handleGrade = async (studentId, marks) => {
//         try{
// const res = await axios.post('http://localhost:3000/grades/assign/all', {
//             studentGrades,
//             assignmentId: selectedAssignment,
//             roomId: room_data.id
// })
//         }
//         catch(err){
//             console.log(err);
//         }
//     }

    // const onSelect = (id,value)=>{
    //     setStudentGrades(pre=>pre.map((student)=>{
    //       if(student.student_id === id){
    //         return {...student, marks}
    //       }
    //       return student;
    //     }))
    //   }

    return (
        <div className="container py-6">
            <Card>
                <CardHeader className="rounded-t-lg">
                    <CardTitle className="text-2xl">Student Results</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-full max-w-xs">
                                <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Assignment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {assignment_data.map((assignment) => (
                                            <SelectItem key={assignment.id} value={assignment.id}>
                                                {assignment.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {isEditing ? (
                                <Button
                                    variant="outline"
                                    onClick={handleSave}
                                    className="ml-4 bg-primary hover:bg-button_hover text-background hover:text-background"
                                >
                                    <Save className="h-4 w-4 mr-2 text-background" />
                                    Save
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={toggleEdit}
                                    className="ml-4"
                                >
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit All
                                </Button>
                            )}
                        </div>

                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-purple-50">
                                        <TableHead className="font-semibold">Student ID</TableHead>
                                        <TableHead className="font-semibold">Student Name</TableHead>
                                        <TableHead className="font-semibold">Marks</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">{student.id}</TableCell>
                                            <TableCell>{student.first_name} {student.last_name}</TableCell>
                                            <TableCell>
                                                {isEditing ? (
                                                    <Input
                                                        type="number"
                                                        defaultValue={student.marks}
                                                        min={0}
                                                        max={100}
                                                        className="w-20"
                                                        onBlur={(e) => updateMarks(student.id, e.target.value)}
                                                    />
                                                ) : (
                                                    student.marks
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <p className="text-sm text-gray-500 text-center">
                            List of students who have submitted their assignment.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}