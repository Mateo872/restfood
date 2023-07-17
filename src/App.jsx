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

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Inicio />}></Route>
                <Route exact path="/inicio" element={<InicioSesion />}></Route>
                <Route exact path="/detalle/:id" element={<DetalleProducto />}></Route>
                <Route
                    exact
                    path="/administrador/*"
                    element={
                        <RutasProtegidas>
                            <RutasAdministrador></RutasAdministrador>
                        </RutasProtegidas>
                    }
                ></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;
