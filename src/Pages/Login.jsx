import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";



function LoginForm() {
    const { userData, setLoggedInUser, setIsUserLogin } = useContext(UserContext);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        if (loggedInUser) {
            navigate("/dashboard");
        }
    }, [loggedInUser, navigate]);

    function validateField(name, value) {
        if (!value.trim()) {
            return `${name} is required`;
        }
        // Email validation
        if (name.includes("email")) {
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                return "Please enter valid email";
            }
        }
        // Password validation
        if (name.includes("password")) {
            if (value.length < 6) {
                return "Password must be at least 6 characters";
            }
        }

        return "";
    }

    function validate() {
        let newErrors = {};
        Object.keys(loginData).forEach((key) => {
            const error = validateField(
                key,
                loginData[key]
            );
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleLogin(e) {
        e.preventDefault();
        if (!validate()) return;

        const login = userData.find((item) => {
            return item.admin_email === loginData.email && item.admin_password === loginData.password
        });

        if (login) {
            localStorage.setItem("loggedInUser", JSON.stringify(login));
            setLoggedInUser(login);
           
            toast.success("login successfully !!");
            // setIsUserLogin(true);
            navigate("/dashboard", { replace: true });
        } else {
          
            toast.error("Invalid email and password");
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        const error = validateField(name, value);
        setErrors({
            ...errors, [name]: error
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Login Form</h1>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold">Email<span className="text-red-500">*</span></label>
                        <input type="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
                        {errors.email && (<span className="mt-1 text-sm text-red-500">{errors.email}</span>)}</div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold">Password <span className="text-red-500">*</span></label>
                        <input type="password" name="password" value={loginData.password} autoComplete="current-password" placeholder="Enter Password" onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" />
                        {errors.password && (<span className="mt-1 text-sm text-red-500">{errors.password}</span>)}</div>

                    <p className="text-center text-sm text-gray-600">Don't have an account?{" "}<Link to="/registration"
                        className="text-gray-600 hover:underline font-medium">Register</Link></p>

                    <button type="submit" className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer">Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;