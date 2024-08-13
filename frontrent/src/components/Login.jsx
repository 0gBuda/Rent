import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const Login = () => {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&scope=&client_id=&client_secret=`
        };

        try {
            const response = await fetch("/auth/jwt/login", requestOptions);
            const data = await response.text(); // Чтение ответа как текст

            if (!response.ok) {
                throw new Error(data); // Бросаем ошибку с текстом ответа
            }
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    };



    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="box" onSubmit={handleSubmit}>
                        <h1 className="title text-center">Login</h1>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={username}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <ErrorMessage message={errorMessage} />
                        <div className="row justify-content-between align-items-center">
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                            <div className="form-group">
                                <Link to="/registration" className="btn btn-link">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
