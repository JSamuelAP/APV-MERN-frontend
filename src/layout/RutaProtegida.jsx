import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

function RutaProtegida() {
	const navigate = useNavigate();
	const { auth, cargando } = useAuth();
	console.log("id: " + auth?._id);

	if (cargando) return "cargando...";

	return (
		<>
			<Header />
			{auth?._id ? (
				<main className="container mx-auto mt-10">
					<Outlet />
				</main>
			) : (
				// <Navigate to="/" />
				navigate("/ ")
			)}
			<Footer />
		</>
	);
}

export default RutaProtegida;
