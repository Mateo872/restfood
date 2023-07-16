import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import QuienesSomos from "./componentes/comunes/QuienesSomos";
import BuscadorPlatos from "./componentes/BuscadorPlatos";
import Footer from "./componentes/comunes/Footer";
import Menu from "./componentes/comunes/Menu";
import Administrador from "./componentes/Administrador";

function App() {
  return (
    <>
      <Header />
      <main>
        <BuscadorPlatos />
        <QuienesSomos />
        <Menu />
      </main>

      <Footer />
    </>
  );
}
export default App;
