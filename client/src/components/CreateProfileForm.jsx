import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EditProfilePage() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('john.doe@example.com')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)
    const [profilePicturePreview, setProfilePicturePreview] = useState(null)

    const handleProfilePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePicture(file);
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };

    const handleDeleteProfilePicture = () => {
        setProfilePicture(null);
        setProfilePicturePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Have to impplement
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('dateOfBirth', dateOfBirth);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }
        console.log('Form submitted:', Object.fromEntries(formData));
        navigate('/profile');
    };


    return (
        <div className="min-h-screen bg-background w-full">
            <main className="container mx-auto px-4 py-8">
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-2xl font-semibold">Create Your Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="profilePicture">Profile Picture</Label>
                                <div className="flex items-center space-x-4">
                                    {profilePicturePreview && (
                                        <div className="relative group">
                                            <img
                                                src={profilePicturePreview}
                                                alt="Profile picture preview"
                                                width={100}
                                                height={100}
                                                className="rounded-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleDeleteProfilePicture}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label="Delete profile picture"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <Input
                                        id="profilePicture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        className="h-15 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:cursor-pointer file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}