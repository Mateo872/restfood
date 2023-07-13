import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./componentes/comunes/Header";
import BuscadorPlatos from "../BuscadorPlatos";

function App() {
  return (
    <>
      <Header />
      <main>
        <BuscadorPlatos />
      </main>
    </>
  );
}

export default App;
