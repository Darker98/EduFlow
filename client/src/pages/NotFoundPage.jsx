import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { MoveLeft } from 'lucide-react'

function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <div className="relative w-full max-w-xl mx-auto px-4">
                {/* Decorative elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
                </div>

                <div className="relative bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 md:p-12 space-y-6 text-center">
                    <h1 className="text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        404
                    </h1>
                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                            Page not found
                        </h2>
                        <p className="text-gray-500 md:text-lg">
                            Sorry, we couldn't find the page you're looking for.
                        </p>
                    </div>
                    <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-[#3a30e2] transition-all"
                    >
                        <Link to="/home">
                            <MoveLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;