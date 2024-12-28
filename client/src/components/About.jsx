import { Book, Users, Calendar, Award, Rocket, Shield, Globe, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <header className="rounded-md mt-5 bg-gradient-to-r from-primary to-accent text-background py-16 px-7">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About EduFlow</h1>
                    <p className="mt-4 text-xl md:text-2xl text-background/80">
                        Transforming Education Through Digital Innovation
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                {/* Mission Section */}
                <section className="mb-20">
                    <Card className="p-8 bg-white/50 backdrop-blur-sm border-0 shadow-lg">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-primary bg-clip-text text-transparent">
                            Our Mission
                        </h2>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                            We aim to revolutionize education by providing a collaborative educational platform that empowers educators and students to create virtual classrooms, overcome accessibility barriers, and unlock global learning opportunities beyond traditional institutions.
                        </p>
                    </Card>
                </section>

                {/* Features Section */}
                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10  bg-primary bg-clip-text text-transparent">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Book, title: 'Course Management', description: 'Easily create and manage courses, assignments, and learning materials.' },
                            { icon: Users, title: 'Attendance Management', description: 'Track and manage attendance effortlessly for better classroom management.' },
                            { icon: Calendar, title: 'Scheduling', description: 'Effortlessly manage class schedules, deadlines, and important events.' },
                            { icon: Award, title: 'Progress Tracking', description: 'Evaluate student performance through detailed results and grading analytics.' },
                        ].map((feature, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0">
                                <CardContent className="p-6">
                                    <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 group-hover:from-purple-200 group-hover:to-blue-200 transition-colors w-fit">
                                        <feature.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Why Choose EduFlow?
                    </h2>
                    <Card className="bg-gradient-to-r from-accent to-primary text-background border-0">
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { icon: Rocket, title: 'Lightning Fast', text: 'Optimized performance for seamless learning experience' },
                                    { icon: Shield, title: 'Secure Platform', text: 'Enterprise-grade security for your data protection' },
                                    { icon: Globe, title: 'Global Access', text: 'Learn from anywhere, at any time, on any device' },
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                                        <item.icon className="w-8 h-8 mb-4" />
                                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                        <p className="text-background/80">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Team Section */}
                <section className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { name: 'Musa Riaz', role: 'Frontend Developer', image: 'https://cdn-icons-png.flaticon.com/128/62/62692.png' },
                            { name: 'Subhan Khalid', role: 'Frontend Developer', image: 'https://cdn-icons-png.flaticon.com/128/62/62692.png' },
                            { name: 'Najiah Khalid', role: 'Backend Developer', image: 'https://cdn-icons-png.flaticon.com/128/3084/3084264.png' },
                            { name: 'Zaid Siddiqui', role: 'Database Engineer', image: 'https://cdn-icons-png.flaticon.com/128/62/62692.png' }
                        ].map((member, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0">
                                <CardContent className="p-6 text-center">
                                    <div className="mb-4 relative">
                                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 p-1">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                                    <p className="text-gray-600">{member.role}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center">
                    <Card className="bg-gradient-to-r from-accent to-primary text-background border-0">
                        <CardContent className="p-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Education?</h2>
                            <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-white/90">
                                Get Started <Zap className="ml-2 h-5 w-5" />
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <footer className="rounded-md bg-gradient-to-r from-primary to-accent text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} EduFlow. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default About;