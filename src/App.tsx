import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import Footer from "./componentes/comunes/Footer";
import Inicio from "./componentes/Inicio";
import DetalleProducto from "./componentes/DetalleProducto";
import InicioSesion from "./componentes/InicioSesion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RutasProtegidas from "./componentes/rutas/RutasProtegidas";
import RutasAdministrador from "./componentes/rutas/RutasAdministrador";
import ContenedorCarrito from "./componentes/ContenedorCarrito";
import Error404 from "./componentes/Error404";
import { useEffect } from "react";
import { obtenerPlatos } from "./componentes/ayudas/consultas";
import { useDispatch, useSelector } from "react-redux";
import { productos } from "./features/productos/productosSlice";
import { ActualizarState, Producto } from "./types/types";

function App() {
  const actualizar = useSelector(
    (state: ActualizarState) => state.actualizar.actualizar
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta: Producto[] | undefined = await obtenerPlatos();
        respuesta && dispatch(productos(respuesta));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductos();
  }, [actualizar]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/usuario/iniciar" element={<InicioSesion />}></Route>
        <Route path="/usuario/registrar" element={<InicioSesion />}></Route>
        <Route
          path="/producto/detalle/:id"
          element={<DetalleProducto />}
        ></Route>
        <Route
          path="/administrador/*"
          element={
            <RutasProtegidas>
              <RutasAdministrador></RutasAdministrador>
            </RutasProtegidas>
          }
        ></Route>
        <Route path="/usuario/carrito" element={<ContenedorCarrito />}></Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
