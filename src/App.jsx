import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import QuienesSomos from "./componentes/comunes/QuienesSomos";
import BuscadorPlatos from "./componentes/BuscadorPlatos";
import Footer from "./componentes/comunes/Footer";
import Menu from "./componentes/comunes/Menu";
import Administrador from "./pages/Administrador";
import ContenedorCarrito from "./componentes/ContenedorCarrito";

function App() {
  return (
    <>
      <Header />
      <main>
        <BuscadorPlatos />
        <QuienesSomos />
        <Menu />
        {/* <ContenedorCarrito /> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
