import CarritoItem from "./CarritoItem";

const ContenedorCarrito = () => {
  return (
    <section className="contenedor_carrito">
      <article>
        <h1 className="titulo_carrito">Carrito</h1>
        <div className="d-flex flex-column gap-3">
          <CarritoItem />
          <CarritoItem />
          <CarritoItem />
        </div>
      </article>
    </section>
  );
};

export default ContenedorCarrito;
