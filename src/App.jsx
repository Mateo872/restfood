import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import QuienesSomos from "./componentes/comunes/QuienesSomos";
import Footer from "./componentes/comunes/Footer";
import Administrador from "./componentes/Administrador";
import Inicio from "./componentes/vistas/Inicio";
import InicioSesion from "./componentes/InicioSesion";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Inicio />}></Route>
                <Route exact path="/inicio" element={<InicioSesion />}></Route>
                <Route exact path="/administrador" element={<Administrador />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
export default App;
