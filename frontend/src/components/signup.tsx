import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { UserPlus } from 'lucide-react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupComponent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
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
        name: string
        email: string,
        password: string
    }) => {
        const response = await axios.post("http://localhost:3000/user/signup", data)
        localStorage.setItem("token", response.data.token)
        console.log(response.data.token)
        navigate(`/`);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateEmail(email)) {
            const data = {
                name: name,
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
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="signupName">Name</Label>
                        <Input id="signupName" placeholder="John Doe" onChange={(e) => {
                            setName(e.currentTarget.value);
                        }} required />
                    </div>
                    <div>
                        <Label htmlFor="signupEmail">Email</Label>
                        <Input id="signupEmail" type="email"
                            placeholder="you@example.com"
                            onChange={handleEmailChange}
                            required />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div>
                        <Label htmlFor="signupPassword">Password</Label>
                        <Input id="signupPassword" type="password" onChange={(e) => {
                            setPassword(e.currentTarget.value);
                        }} required />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-red-600 hover:from-blue-600 hover:to-pink-700 text-white" type="submit">
                        Sign Up <UserPlus className="ml-2 h-4 w-4" />
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/user/login" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    )
}