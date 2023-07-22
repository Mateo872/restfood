import { Route, Routes } from "react-router-dom";
import Administrador from "../Administrador";
import CrearEditarProducto from "../CrearEditarProducto";
import ContenedorCarrito from "../ContenedorCarrito";

const RutasAdministrador = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Administrador />}></Route>
        <Route
          exact
          path="/producto/editar/:id"
          element={<CrearEditarProducto />}
        ></Route>
        <Route
          exact
          path="/producto/crear"
          element={<CrearEditarProducto />}
        ></Route>
      </Routes>
    </>
  );
};

export default RutasAdministrador;
