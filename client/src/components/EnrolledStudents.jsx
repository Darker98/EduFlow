import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Search, Trash2 } from 'lucide-react'
import { useEffect} from 'react'
import { setLoading, hideLoading } from "@/redux/features/loadingSlice"
import { useDispatch, useSelector } from "react-redux"
import {useToast} from "@/hooks/use-toast"
import axios from 'axios'

export default function EnrolledStudents() {
 
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch();
  const { room_data } = useSelector((state) => state.room);
  const [students, setStudents] = useState([]);
  const { user_data } = useSelector((state) => state.user);
  const {toast} = useToast();

  useEffect(() => {
    async function getStudents() {
      try {
        const res = await axios.post(
          "http://localhost:3000/enrollment/students",
          {
            room_id: room_data.id,
          }
        );
        if (res.data.success) {
          setStudents(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getStudents();
  }, []);

  const handleKickStudent = async () => {
    try{
    dispatch(setLoading());
    const res = await axios.post('http://localhost:3000/enrollment/unenroll', {
        student_id: user_data.id,
        room_id: room_data.id
    });
    dispatch(hideLoading())
    if(res.data.success){
        setStudents(students.filter((student) => student.id !== user_data.id));
        toast({
            title:"Success",
            description:"Student unenrolled successfully",
            variant:"default"
        })
    }
}
    catch(err){
      dispatch(hideLoading());
        console.log(err); 
        toast({
            title:"Error",
            description: err.response.data.message,
            variant:"destructive"
        })
    }
  } 

  const filteredStudents = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteEnrollment = (studentId) => {
    handleKickStudent();
    setStudents(students.filter((student) => student.id !== studentId))
  }


  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Enrolled Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback >
                          <img className="h-8 " src={student.pfp_url}  />
                        </AvatarFallback>
                      </Avatar>
                      <span>{student.first_name} {student.last_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.user_name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Enrollment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the enrollment for {student.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteEnrollment(student.id)}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredStudents.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No students found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}