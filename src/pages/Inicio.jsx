import React from "react";
import Header from "../componentes/comunes/Header";
import BuscadorPlatos from "../../BuscadorPlatos";
import QuienesSomos from "../componentes/comunes/QuienesSomos";
import Menu from "../componentes/comunes/Menu";
import Footer from "../componentes/comunes/Footer";

const Inicio = () => {
  return (
    <div>
      <Header />
      <main>
        <BuscadorPlatos />
        <QuienesSomos />
        <Menu />
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;
