import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";

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
}

export default App;
