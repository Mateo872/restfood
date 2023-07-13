import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
<<<<<<< HEAD

import QuienesSomos from "./componentes/comunes/QuienesSomos";

import BuscadorPlatos from "../BuscadorPlatos";

function App() {
    return (
        <>
            <Header />
            <main>
                <BuscadorPlatos />
                <QuienesSomos />
            </main>
        </>
    );
=======

import QuienesSomos from "./componentes/comunes/QuienesSomos";

import BuscadorPlatos from "../BuscadorPlatos";
import Footer from "./componentes/comunes/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <BuscadorPlatos />
    <QuienesSomos />
      </main>
      <Footer />
    </>
  );

>>>>>>> 0f284f68873f30d0fc81dcb3e115dea1ab83c786
}

export default App;
