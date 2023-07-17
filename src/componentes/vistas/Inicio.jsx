import React from "react";
import BuscadorPlatos from "../BuscadorPlatos";
import QuienesSomos from "../comunes/QuienesSomos";
import Menu from "../comunes/Menu";

const Inicio = () => {
    return (
        <main>
            <BuscadorPlatos />
            <QuienesSomos />
            <Menu />
        </main>
    );
};

export default Inicio;
