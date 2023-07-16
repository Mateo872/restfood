import PlatoItem from "./PlatoItem";

const ContenedorPlato = () => {
  return (
    <div className="contenedor_slider  position-absolute">
      <div className="contenedor_buscador d-flex flex-column justify-content-between gap-2">
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
      </div>
    </div>
  );
};

export default ContenedorPlato;
