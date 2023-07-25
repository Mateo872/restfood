import { BsTrash } from "react-icons/bs";

const CarritoItem = ({ producto }) => {
  const { nombre, precio, imagen, cantidad } = producto;
  return (
    <div className="contenedor_producto-carrito d-flex justify-content-between align-items-center">
      <div
        className="contenedor_imagen"
        style={{ backgroundImage: `url(${imagen})` }}
      ></div>
      <div className="carrito_caracteristicas carac_titulo d-flex flex-column">
        <h6 className="title">Título</h6>
        <h6 className="subtitle mb-0" title={nombre}>
          {nombre}
        </h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Cantidad</h6>
        <h6 className="subtitle mb-0">{cantidad}</h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Precio</h6>
        <h6 className="subtitle mb-0">${precio}</h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Subtotal</h6>
        <h6 className="subtitle mb-0">${precio * cantidad}</h6>
      </div>
      <BsTrash />
    </div>
  );
};

export default CarritoItem;
