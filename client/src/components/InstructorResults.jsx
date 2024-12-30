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

// Sample data
const assignments = [
    { id: "1", name: "Assignment 1" },
    { id: "2", name: "Assignment 2" },
]

export default function InstructorResultsPage() {
    const [selectedAssignment, setSelectedAssignment] = useState("")
    const [students, setStudents] = useState([
        { id: "464215", name: "Musa Riaz", course: "CS101", marks: 90 },
        { id: "263113", name: "Ibrahim Riaz", course: "CS101", marks: 60 },
        { id: "234215", name: "Musa Riaz", course: "CS101", marks: 80 },
        { id: "166211", name: "Buster Scrubs", course: "CS101", marks: 85 },
        { id: "781223", name: "Nikama Bacha", course: "CS101", marks: 90 },
    ])
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const updateMarks = (studentId, newMarks) => {
        const marks = Math.min(100, Math.max(0, Number(newMarks) || 0))
        setStudents(students.map(student =>
            student.id === studentId
                ? { ...student, marks, grade: calculateGrade(marks) }
                : student
        ))
    }

    const handleSave = async () => {

        toggleEdit();
    }

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
                                        {assignments.map((assignment) => (
                                            <SelectItem key={assignment.id} value={assignment.id}>
                                                {assignment.name}
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
                                            <TableCell>{student.name}</TableCell>
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
                            List of students in the class.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}