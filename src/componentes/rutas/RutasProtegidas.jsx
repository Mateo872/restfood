import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children }) => {
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null;

    if (!usuarioLogueado) {
        return <Navigate to={"/login"} />;
    }
    return children;
};

export default RutasProtegidas;
