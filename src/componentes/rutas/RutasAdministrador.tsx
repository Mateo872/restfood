import { Route, Routes } from "react-router-dom";
import Administrador from "../Administrador";
import CrearEditarProducto from "../CrearEditarProducto";

const RutasAdministrador = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Administrador />}></Route>
        <Route
          path="/producto/editar/:id"
          element={<CrearEditarProducto />}
        ></Route>
        <Route path="/producto/crear" element={<CrearEditarProducto />}></Route>
      </Routes>
    </>
  );
};

export default RutasAdministrador;
