import { useState } from "react";
import CarritoItem from "./CarritoItem";
import ModalPago from "./ModalPago";
import Swal from "sweetalert2";

const ContenedorCarrito = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <section className="contenedor_carrito">
      <article>
        <h1 className="titulo_carrito">Carrito</h1>
        <div className="d-flex flex-column gap-3">
          <CarritoItem />
          <CarritoItem />
          <CarritoItem />
        </div>
        <div className="contenedor_botones w-100 d-flex justify-content-between mt-3">
          <button className="boton_vaciar">Vaciar carrito</button>
          <div className="d-flex align-items-center">
            <h5 className="mb-0">
              Total: $<span>6000</span>
            </h5>
            <button
              className="boton_comprar"
              onClick={() => setMostrarModal(!mostrarModal)}
            >
              Comprar
            </button>
          </div>
        </div>
        {mostrarModal ? (
          <div
            className="modal_overlay d-flex justify-content-center align-items-center vh-100 w-100"
            onClick={(e) => {
              if (e.target.classList.contains("modal_overlay")) {
                Swal.fire({
                  title: "¿Estás seguro?",
                  text: "Perderás el proceso de compra",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Si, salir",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setMostrarModal(false);
                  }
                });
              }
            }}
          >
            <ModalPago
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
            />
          </div>
        ) : (
          <></>
        )}
      </article>
    </section>
  );
};

export default ContenedorCarrito;
