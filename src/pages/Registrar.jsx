import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
	const [nombre, setNombre] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repetirPassword, setRepetirPassword] = useState("");
	const [alerta, setAlerta] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([nombre, email, password, repetirPassword].includes("")) {
			setAlerta({ msg: "No se permiten campos vacios", error: true });
			return;
		}
		if (password !== repetirPassword) {
			setAlerta({ msg: "Los passwords no son iguales", error: true });
			return;
		}
		if (password.length < 6) {
			setAlerta({
				msg: "El password es muy corto, agrega minimmo 6 caracteres",
				error: true,
			});
			return;
		}

		setAlerta({});

		// Crear el usuario en la API
		try {
			await clienteAxios.post("/veterinarios", { nombre, email, password });
			setAlerta({ msg: "Creado correctamente, revisa tu email", error: false });
		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true });
		}
	};

	const { msg } = alerta;

	return (
		<>
			<div>
				<h1 className="text-emerald-600 font-black text-6xl">
					Crea tu cuenta y administra tus{" "}
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
							Nombre
						</label>
						<input
							type="text"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus-visible:outline-emerald-600"
							placeholder="Tu nombre"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
						/>
					</div>

					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold"
							htmlFor=""
						>
							Email
						</label>
						<input
							type="email"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus-visible:outline-emerald-600"
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
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus-visible:outline-emerald-600"
							placeholder="Tu contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold"
							htmlFor=""
						>
							Repetir password
						</label>
						<input
							type="password"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus-visible:outline-emerald-600"
							placeholder="Repite la contraseña"
							value={repetirPassword}
							onChange={(e) => setRepetirPassword(e.target.value)}
						/>
					</div>

					<input
						type="submit"
						value="Registrar cuenta"
						className="bg-emerald-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-emerald-800 md:w-auto focus:outline-none focus-visible:outline-emerald-500"
					/>
				</form>
				<nav className="mt-10 lg:flex lg:justify-between">
					<Link to="/" className="block text-center my-5 text-gray-500">
						¿Ya tienes una cuenta? Inicia sesión
					</Link>
					<Link
						to="/olvidepassword"
						className="block text-center my-5 text-gray-500"
					>
						Olvidé mi password
					</Link>
				</nav>
			</div>
		</>
	);
};

export default Registrar;
