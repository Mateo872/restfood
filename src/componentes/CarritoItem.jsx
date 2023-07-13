import { BsTrash } from "react-icons/bs";
import hambur from "../complementos/imagenes/hambur.png";

const CarritoItem = () => {
  return (
    <div className="contenedor_producto-carrito d-flex justify-content-between align-items-center">
      <div
        className="contenedor_imagen"
        style={{ backgroundImage: `url(${hambur})` }}
      ></div>
      <div className="carrito_caracteristicas carac_titulo d-flex flex-column">
        <h6 className="title">Título</h6>
        <h6 className="subtitle mb-0">Hamburguesa</h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Cantidad</h6>
        <h6 className="subtitle mb-0">2</h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Precio</h6>
        <h6 className="subtitle mb-0">$1000</h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Subtotal</h6>
        <h6 className="subtitle mb-0">$2000</h6>
      </div>
      <BsTrash />
    </div>
  );
};

export default CarritoItem;
