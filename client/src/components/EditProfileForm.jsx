import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditProfilePage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: 'johndoe123',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        dateOfBirth: '1995-05-15',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the formData to your backend
        console.log('Form submitted:', formData)
        navigate('/profile')
    }

    return (
        <div className="min-h-screen bg-white w-full">
            <main className="w-full px-4 py-5">
                <Card className="w-full bg-gray-50 border-gray-200">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-2xl font-semibold">Update Your Information</CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 mt-6">
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

