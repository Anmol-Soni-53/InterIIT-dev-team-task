import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from 'lucide-react'
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function LoginComponent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e: any) => {
        const value = e.currentTarget.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const HandleSignIn = async (data: {
        email: string,
        password: string
    }) => {
        const response = await axios.post("http://localhost:3000/user/signin", data)
        localStorage.setItem("token", response.data.token)
        console.log(response.data.token)
        navigate(`/`);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateEmail(email)) {
            const data = {
                email: email,
                password: password
            }
            HandleSignIn(data);
        } else {
            setEmailError('Please enter a valid email address.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md w-full p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back!</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="loginEmail">Email</Label>
                        <Input
                            id="loginEmail"
                            type="email"
                            placeholder="you@example.com"
                            onChange={handleEmailChange}
                            required
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div>
                        <Label htmlFor="loginPassword">Password</Label>
                        <Input
                            id="loginPassword"
                            type="password"
                            required
                            onChange={(e) => {
                                setPassword(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <Button className="w-full" type="submit">
                        Log In <LogIn className="ml-2 h-4 w-4" />
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/user/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}