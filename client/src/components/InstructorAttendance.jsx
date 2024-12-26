import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function InstructorAttendance() {

    const [selectedSession, setSelectedSession] = useState("1")
    const sessions = [
        { id: "1", date: "2023-06-01", time: "10:00-11:00" },
        { id: "2", date: "2023-06-08", time: "10:00-11:00" },
    ]
    const students = [
        { id: 1, name: "Alice Johnson", attendance: { "1": true, "2": false } },
        { id: 2, name: "Bob Smith", attendance: { "1": true, "2": true } },
        { id: 3, name: "Charlie Brown", attendance: { "1": false, "2": true } },
    ]

    const handleAttendanceChange = (studentId, sessionId, value) => {
        // Update attendance logic here
        console.log(`Student ${studentId} attendance for session ${sessionId} set to ${value}`)
    }

    return (
        <div className="container py-6">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Mark Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select value={selectedSession} onValueChange={setSelectedSession}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select session" />
                        </SelectTrigger>
                        <SelectContent>
                            {sessions.map((session) => (
                                <SelectItem key={session.id} value={session.id}>
                                    Session - {session.date} - {session.time}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Present</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell className="w-1/4">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Attendance" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={'true'}>Present</SelectItem>
                                                <SelectItem value={'false'}>Absent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">Save Attendance</Button>
        </div>
    )
}

export default InstructorAttendance;