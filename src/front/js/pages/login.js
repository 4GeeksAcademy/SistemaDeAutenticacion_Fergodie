import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			
			await actions.login(username, password, email, navigate);

			
		} catch (error) {
			
			console.error('Error de inicio de sesión:', error);
		}
	};

	return (
		<div className="container">
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username
					</label>
					<input
						type="text"
						className="form-control"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Log In
				</button>
			</form>

			<Link to="/">
				<button className="btn btn-secondary mt-3">Back home</button>
			</Link>
		</div>
	);
};