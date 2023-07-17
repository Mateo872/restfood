import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children }) => {
    // const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null;

    // if (!usuarioLogueado) {
    //     // console.log("entre");
    //     return <Navigate to={"/inicio"} />;
    // }
    return children;
};

export default RutasProtegidas;
