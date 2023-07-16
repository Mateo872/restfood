import platoImagen from "../complementos/imagenes/hambur.png";

const PlatoItem = () => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <div className="plato_imagen">
          <img className="w-100 h-100" src={platoImagen} alt="" />
        </div>
        <h6 className="mb-0">Hamburguesa doble</h6>
      </div>
      <h5 className="mb-0">$200</h5>
    </div>
  );
};

export default PlatoItem;
