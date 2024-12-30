import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {useState, useEffect} from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'

export default function StudentResults() {
    const {user_data} = useSelector((state)=> state.user)
    const {room_data} = useSelector((state) => state.room)
    const {assignment_data} = useSelector((state) => state.assignment)
    const [resultsData, setResultsData] = useState(); 
    // const resultsData = [
    //     { id: 1, assignment: "Assignment 1", score: 85, maxScore: 100 },
    //     { id: 2, assignment: "Assignment 2", score: 92, maxScore: 100 },

    // ]

    useEffect(() => {
        async function getResults(){
            try{
                const res = await axios.post("http://localhost:3000/grades/getall", {
                    studentId:user_data.id,
                    roomId:room_data.id,
                
                })
                if(res.data.success){
                    setResultsData(res.data.data)
                    console.log(res.data.data)
                }
                }
                catch(err){
                console.log(err)
                }
        }
        getResults();

    }, [])

    return (
        <div className="container py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Assignment Scores</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Assignment</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Max Score</TableHead>
                                <TableHead>Percentage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resultsData?.map((result) => (
                                <TableRow key={result.id}>
                                    <TableCell>{result.assignment}</TableCell>
                                    <TableCell>{result.marks}</TableCell>
                                    <TableCell>{result.maxScore}</TableCell>
                                    <TableCell>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-purple-600 h-2.5 rounded-full"
                                                style={{ width:`${(result.marks / 100) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {((result.score / result.maxScore) * 100).toFixed(2)}%
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