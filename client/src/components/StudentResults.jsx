import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function StudentResults() {
    const resultsData = [
        { id: 1, assignment: "Assignment 1", score: 85, maxScore: 100 },
        { id: 2, assignment: "Assignment 2", score: 92, maxScore: 100 },
    ]

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
                            {resultsData.map((result) => (
                                <TableRow key={result.id}>
                                    <TableCell>{result.assignment}</TableCell>
                                    <TableCell>{result.score}</TableCell>
                                    <TableCell>{result.maxScore}</TableCell>
                                    <TableCell>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-purple-600 h-2.5 rounded-full"
                                                style={{ width:`${(result.score / result.maxScore) * 100}%` }}
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