import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";

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

}

export default App;
