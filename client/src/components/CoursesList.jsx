import { useState } from "react"
import { Search, Users, Clock, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Sample course data
const coursesData = [
    {
        id: 1,
        name: "Introduction to Computer Science",
        instructor: "Dr. Sarah Johnson",
        description: "Learn the fundamentals of computer science and programming",
        students: 45,
        duration: "16 weeks",
        status: "open",
        image: "/placeholder.svg",
    },
    {
        id: 2,
        name: "Advanced Mathematics",
        instructor: "Prof. Michael Chen",
        description: "Deep dive into calculus and linear algebra",
        students: 32,
        duration: "12 weeks",
        status: "open",
        image: "/placeholder.svg",
    },
    {
        id: 3,
        name: "Digital Marketing Fundamentals",
        instructor: "Emily Rodriguez",
        description: "Master the basics of digital marketing",
        students: 60,
        duration: "8 weeks",
        status: "open",
        image: "/placeholder.svg",
    },
    {
        id: 4,
        name: "Web Development Bootcamp",
        instructor: "Alex Turner",
        description: "Comprehensive web development course",
        students: 50,
        duration: "20 weeks",
        status: "open",
        image: "/placeholder.svg",
    },
]

function CoursesList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrollmentKey, setEnrollmentKey] = useState("");
    const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);

    // Filter courses based on search query
    const filteredCourses = coursesData.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleEnroll = (course) => {
        setSelectedCourse(course)
        setEnrollDialogOpen(true)
    }

    const handleEnrollmentSubmit = () => {
        // Here you would typically validate the enrollment key and handle the enrollment
        console.log(`Enrolling in ${selectedCourse?.name} with key: ${enrollmentKey}`)
        setEnrollDialogOpen(false)
        setEnrollmentKey("")
    }

    return (
        <div className="container py-6">
            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Available Courses</h1>
                        <p className="text-sm text-gray-500">Browse and enroll in courses</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search courses..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                        <Card key={course.id} className="flex flex-col overflow-hidden">
                            <CardHeader className="border-b p-0">
                                <div className="aspect-video relative">
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <Badge variant="secondary" className="mb-2 bg-white/90">
                                            {course.status}
                                        </Badge>
                                        <h3 className="text-lg font-semibold text-background">{course.name}</h3>
                                        <p className="text-sm text-background/80">{course.instructor}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-4">
                                <p className="text-sm text-gray-500 mb-4">{course.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>{course.students} Students</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t p-4 bg-gray-50">
                                <Button
                                    className="w-full bg-primary hover:bg-[#3a30e2] text-background"
                                    onClick={() => handleEnroll(course)}
                                >
                                    Enroll Now
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No courses found matching your search.</p>
                    </div>
                )}

                {/* Enrollment Dialog */}
                <Dialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Course Enrollment</DialogTitle>
                            <DialogDescription>
                                Enter the enrollment key for {selectedCourse?.name} to join the course.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <h4 className="font-medium">Course Details</h4>
                                <p className="text-sm text-gray-500">
                                    Instructor: {selectedCourse?.instructor}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Duration: {selectedCourse?.duration}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="enrollmentKey" className="text-sm font-medium">
                                    Enrollment Key
                                </label>
                                <Input
                                    id="enrollmentKey"
                                    value={enrollmentKey}
                                    onChange={(e) => setEnrollmentKey(e.target.value)}
                                    placeholder="Enter your enrollment key"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEnrollDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="bg-purple-600 hover:bg-purple-700"
                                onClick={handleEnrollmentSubmit}
                                disabled={!enrollmentKey}
                            >
                                Enroll in Course
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default CoursesList;