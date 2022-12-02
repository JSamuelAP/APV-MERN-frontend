import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [alerta, setAlerta] = useState({});

	const { setAuth } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([email, password].includes("")) {
			setAlerta({ msg: "Todos los campos son obligatorios", error: true });
			return;
		}

		try {
			const { data } = await clienteAxios.post("/veterinarios/login", {
				email,
				password,
			});

			localStorage.setItem("token", data.token);
			setAuth(data);
			navigate("/admin");
		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true });
		}
	};

	const { msg } = alerta;
	return (
		<>
			<div>
				<h1 className="text-emerald-600 font-black text-6xl">
					Inicia sesión y administra a tus{" "}
					<span className="text-violet-900">pacientes</span>
				</h1>
			</div>
			<div className="mt-20 md:mt-5 shadow-lg px-5 py-4 rounded-xl bg-white">
				{msg && <Alerta alerta={alerta} />}
				<form onSubmit={handleSubmit}>
					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold"
							htmlFor=""
						>
							Email
						</label>
						<input
							type="email"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl accent-emerald-600"
							placeholder="Email de registro"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold"
							htmlFor=""
						>
							Password
						</label>
						<input
							type="password"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl accent-emerald-600"
							placeholder="Tu contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<input
						type="submit"
						value="Iniciar Sesión"
						className="bg-emerald-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-emerald-800 md:w-auto accent-emerald-500"
					/>
				</form>
				<nav className="mt-10 lg:flex lg:justify-between">
					<Link
						to="/registrar"
						className="block text-center my-5 text-gray-500 accent-emerald-600"
					>
						¿No tienes una cuenta? Regístrate
					</Link>
					<Link
						to="/olvidepassword"
						className="block text-center my-5 text-gray-500 accent-emerald-600"
					>
						Olvidé mi password
					</Link>
				</nav>
			</div>
		</>
	);
};

export default Login;
