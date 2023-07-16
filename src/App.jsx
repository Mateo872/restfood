import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import QuienesSomos from "./componentes/comunes/QuienesSomos";
import BuscadorPlatos from "./componentes/BuscadorPlatos";
import Footer from "./componentes/comunes/Footer";
import Menu from "./componentes/comunes/Menu";
import CrearEditarProducto from "./componentes/CrearEditarProducto";
import ContenedorCarrito from "./componentes/ContenedorCarrito";
import ModalPago from "./componentes/ModalPago";
import InicioSesion from "./componentes/InicioSesion";

function App() {
  return (
    <>
      <Header />
      <main>
        <BuscadorPlatos />
        <QuienesSomos />
        <Menu />
        {/* <ModalPago /> */}
        {/* <ContenedorCarrito /> */}
        {/* <InicioSesion></InicioSesion> */}
      </main>

      <Footer />
    </>
  );
}
export default App;
