import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import QuienesSomos from "./componentes/comunes/QuienesSomos";
import Footer from "./componentes/comunes/Footer";
import Administrador from "./componentes/Administrador";
import Inicio from "./componentes/vistas/Inicio";
import DetalleProducto from "./componentes/vistas/DetalleProducto";
import InicioSesion from "./componentes/InicioSesion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RutasProtegidas from "./componentes/rutas/RutasProtegidas";
import RutasAdministrador from "./componentes/rutas/RutasAdministrador";
import ContenedorCarrito from "./componentes/ContenedorCarrito";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Inicio />}></Route>
        <Route exact path="/usuario/iniciar" element={<InicioSesion />}></Route>
        <Route
          exact
          path="/usuario/registrar"
          element={<InicioSesion />}
        ></Route>
        <Route
          exact
          path="producto/detalle/:id"
          element={<DetalleProducto />}
        ></Route>
        <Route
          exact
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
        <Route
          path="/restfood/nosotros"
          element={<h1 className="mt-5">Nosotros</h1>}
        />
        <Route path="*" element={<h1 className="mt-5">Error 404</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
