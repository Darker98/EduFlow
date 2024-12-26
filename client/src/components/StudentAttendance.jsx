import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StudentAttendancePage() {
    const attendanceData = [
        { id: 1, date: "2023-06-01", status: "Present" },
        { id: 2, date: "2023-06-08", status: "Absent" },
        { id: 3, date: "2023-06-15", status: "Present" },
        { id: 4, date: "2023-06-22", status: "Present" },
    ]

    return (
        <div className="container py-6">

            <Card>
                <CardHeader>
                    <CardTitle>Attendance Record</CardTitle>
                    <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-purple-600 h-2.5 rounded-full"
                                style={{ width: `${(3 / 4) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                            {((3 / 4) * 100).toFixed(2)}%
                        </span>
                    </TableCell>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceData.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${record.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            }`}>
                                            {record.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}