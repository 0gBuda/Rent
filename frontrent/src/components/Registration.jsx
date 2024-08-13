import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const Registration = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");


    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ first_name: first_name, last_name: last_name ,email: email, phone_number:phone_number, username:username,password: password }),
        };

        const response = await fetch("/auth/register", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmationPassword && password.length > 5) {
            submitRegistration();
        } else {
            setErrorMessage(
                "Ensure that the passwords match and greater than 5 characters"
            );
        }
    };




    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="box" onSubmit={handleSubmit}>
                        <h1 className="title text-center">Registration</h1>
                        <div className="form-group">
                            <label>First Name</label>
                            <div className="control">
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <div className="control">
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <div className="control">
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={phone_number}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="control">
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <div className="control">
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <div className="control">
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="control">
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={confirmationPassword}
                                    onChange={(e) => setConfirmationPassword(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <br/>
                        <ErrorMessage message={errorMessage}/>
                        <button className="btn btn-primary btn-block" type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
