import BuscadorPlatos from "./BuscadorPlatos";
import QuienesSomos from "./QuienesSomos";
import Menu from "./Menu";

const Inicio = () => {
  return (
    <main style={{ backgroundColor: "#ddd" }}>
      <BuscadorPlatos />
      <QuienesSomos />
      <Menu />
    </main>
  );
};

export default Inicio;
