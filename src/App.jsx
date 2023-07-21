import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import QuienesSomos from "./componentes/QuienesSomos";
import Footer from "./componentes/comunes/Footer";
import Administrador from "./componentes/Administrador";
import Inicio from "./componentes/Inicio";
import DetalleProducto from "./componentes/DetalleProducto";
import InicioSesion from "./componentes/InicioSesion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RutasProtegidas from "./componentes/rutas/RutasProtegidas";
import RutasAdministrador from "./componentes/rutas/RutasAdministrador";
import ContenedorCarrito from "./componentes/ContenedorCarrito";
import Nosotros from "./componentes/Nosotros";
import Error404 from "./componentes/Error404";

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
        <Route path="/restfood/nosotros" element={<Nosotros />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
