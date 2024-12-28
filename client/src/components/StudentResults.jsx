import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const gradeData = [
    { type: "Assignment", name: "Assignment 1", grade: 85, maxGrade: 100 },
    { type: "Assignment", name: "Assignment 2", grade: 18, maxGrade: 20 },
    { type: "Assignment", name: "Assignment 3", grade: 78, maxGrade: 100 },
    { type: "Assignment", name: "Project", grade: 92, maxGrade: 100 },
];

function StudentResults() {
    const [selectedType, setSelectedType] = useState("All");

    const filteredGradeData =
        selectedType === "All"
            ? gradeData
            : gradeData.filter((item) => item.type === selectedType);

    const totalGrade = filteredGradeData.reduce(
        (sum, item) => sum + item.grade,
        0
    );
    const totalMaxGrade = filteredGradeData.reduce(
        (sum, item) => sum + item.maxGrade,
        0
    );
    const overallPercentage = ((totalGrade / totalMaxGrade) * 100).toFixed(2);

    return (
        <div className="min-h-screen bg-white text-black">
            <div className=" my-5 rounded-lg p-3 text-center text-4xl font-bold bg-black text-white">
                <h1>Student Results</h1>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Overall Grade Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{overallPercentage}%</p>
                    <p className="text-sm text-gray-600">
                        Total: {totalGrade} / {totalMaxGrade}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Detailed Results</CardTitle>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Types</SelectItem>
                            <SelectItem value="Assignment">Assignment</SelectItem>
                            <SelectItem value="Quiz">Quiz</SelectItem>
                            <SelectItem value="Exam">Exam</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Type</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">Grade</TableHead>
                                <TableHead className="text-right">Percentage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGradeData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.type}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-right">
                                        {item.grade} / {item.maxGrade}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {((item.grade / item.maxGrade) * 100).toFixed(2)}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default StudentResults;
