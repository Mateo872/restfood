import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import QuienesSomos from "./componentes/comunes/QuienesSomos";
import BuscadorPlatos from "../BuscadorPlatos";
import Footer from "./componentes/comunes/Footer";
import Menu from "./componentes/comunes/Menu";
import Administrador from "./pages/Administrador"

function App() {
  return (
    <>
      {/*<Header />
      <main>
        <BuscadorPlatos />
        <QuienesSomos />
        <Menu />
      </main>
    <Footer />*/}
    <Administrador></Administrador>
    </>
  );
}

export default App;
