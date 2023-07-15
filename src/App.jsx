import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import QuienesSomos from "./componentes/comunes/QuienesSomos";
import BuscadorPlatos from "./componentes/BuscadorPlatos";
import Footer from "./componentes/comunes/Footer";
import Menu from "./componentes/comunes/Menu";
<<<<<<< HEAD
import ContenedorCarrito from "./componentes/ContenedorCarrito";
import ModalPago from "./componentes/ModalPago";

function App() {
    return (
        <>
            <Header />
            <main>
                <BuscadorPlatos />
                <QuienesSomos />
                <Menu />
                <ModalPago />
                {/* <ContenedorCarrito /> */}
            </main>

            <Footer />
        </>
    );
=======
import Administrador from "./pages/Administrador"
import InicioSesion from "./componentes/InicioSesion";

function App() {
  return (
    <>
      <Header />
      <main>
        <BuscadorPlatos />
        <QuienesSomos />
        <Menu />
        {/* <InicioSesion></InicioSesion> */}
      </main>
    <Footer />
    </>
  );
>>>>>>> iniciodesesion
}

export default App;
