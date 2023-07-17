import { Route, Routes } from "react-router-dom";
import Administrador from "../Administrador";
import CrearEditarProducto from "../CrearEditarProducto";

const RutasAdministrador = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Administrador />}></Route>
                <Route exact path="/crear" element={<CrearEditarProducto />}></Route>
            </Routes>
        </>
    );
};

export default RutasAdministrador;
