import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
	const { cerrarSesion } = useAuth();

	return (
		<header className="py-10 bg-emerald-600">
			<div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-center">
				<h1 className="font-bold text-2xl text-emerald-200">
					Administrador de Pacientes de {""}{" "}
					<span className="text-white font-black">Veterinaria</span>
				</h1>
				<nav className="flex flex-col md:flex-row gap-4 mt-5 lg:mt-0">
					<Link
						to="/admin"
						className="text-white text-sm uppercase font-bold accent-emerald-600"
					>
						Pacientes
					</Link>
					<Link
						to="/admin/perfil"
						className="text-white text-sm uppercase font-bold accent-emerald-600"
					>
						Perfil
					</Link>
					<button
						type="button"
						className="text-white text-sm uppercase font-bold accent-emerald-600"
						onClick={cerrarSesion}
					>
						Cerrar Sesión
					</button>
				</nav>
			</div>
		</header>
	);
}

export default Header;
