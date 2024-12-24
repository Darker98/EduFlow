import { Book, Users, Calendar, Award, ArrowRight } from 'lucide-react'

function About() {
    return (
        <div className="min-h-screen bg-white text-black">
            <header className="bg-gray-100 rounded-lg text-black py-8 border">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">About EduFlow</h1>
                    <p className="mt-2 text-lg md:text-xl text-gray-600">Empowering Education Through Innovation</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <section className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg md:text-xl leading-relaxed ">
                        We aim to revolutionize education by providing a collaborative educational platform that empowers educators and students to create virtual classrooms, overcome accessibility barriers, and unlock global learning opportunities beyond traditional institutions.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Book, title: 'Course Management', description: 'Easily create and manage courses, assignments, and learning materials.' },
                            { icon: Users, title: 'Attendance Management', description: 'Track and manage attendance effortlessly for better classroom management.' },
                            { icon: Calendar, title: 'Scheduling', description: 'Effortlessly manage class schedules, deadlines, and important events.' },
                            { icon: Award, title: 'Progress Tracking', description: 'Evaluate student performance through detailed results and grading analytics.' },
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-100 p-6 rounded-lg transition-transform hover:scale-105">
                                <feature.icon className="w-12 h-12 mb-4 text-black" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-700">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us?</h2>
                    <div className="bg-black text-white p-8 rounded-lg shadow-xl">
                        <ul className="space-y-4">
                            {[
                                'Intuitive and user-friendly interface',
                                'Customizable to fit your institution\'s needs',
                                'Robust security measures to protect sensitive data',
                            ].map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { name: 'Musa Riaz', role: 'Frontend', image: 'https://cdn-icons-png.flaticon.com/128/62/62692.png' },
                            { name: 'Subhan Khalid', role: 'Frontend', image: 'https://cdn-icons-png.flaticon.com/128/62/62692.png' },
                            { name: 'Najiah Khalid', role: 'Backend', image: 'https://cdn-icons-png.flaticon.com/128/3084/3084264.png' },
                            { name: 'Zaid Siddiqui', role: 'Database', image: 'https://cdn-icons-png.flaticon.com/128/62/62692.png' }
                        ].map((member, index) => (
                            <div key={index} className="text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    width={150}
                                    height={150}
                                    className="rounded-full mx-auto mb-4 grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-black rounded-lg text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} EduFlow. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default About;