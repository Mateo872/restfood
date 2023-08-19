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
import Nosotros from "./componentes/Nosotros";
import Error404 from "./componentes/Error404";
import { useState } from "react";

function App() {
  const usuarioSessionStorage =
    JSON.parse(sessionStorage.getItem("usuario")) || {};
  const [usuarioLogueado, setUsuarioLogeado] = useState(usuarioSessionStorage);
  return (
    <BrowserRouter>
      <Header
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogeado={setUsuarioLogeado}
      />
      <Routes>
        <Route exact path="/" element={<Inicio />}></Route>
        <Route
          exact
          path="/usuario/iniciar"
          element={
            <InicioSesion
              setUsuarioLogeado={setUsuarioLogeado}
              usuarioLogueado={usuarioLogueado}
            />
          }
        ></Route>
        <Route
          exact
          path="/usuario/registrar"
          element={
            <InicioSesion
              setUsuarioLogeado={setUsuarioLogeado}
              usuarioLogueado={usuarioLogueado}
            />
          }
        ></Route>
        <Route
          exact
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
        <Route
          exact
          path="/usuario/carrito"
          element={<ContenedorCarrito />}
        ></Route>
        <Route path="/restfood/nosotros" element={<Nosotros />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
