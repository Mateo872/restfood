import { useEffect, useState } from "react";
import CarritoItem from "./CarritoItem";
import ModalPago from "./ModalPago";
import Swal from "sweetalert2";
import { obtenerUsuario } from "./ayudas/consultas";

const ContenedorCarrito = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioID, setUsuarioID] = useState(null);
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;

  useEffect(() => {
    if (usuario && usuario.id) {
      obtenerUsuario(usuario.id).then((res) => {
        setUsuarioID(res);
      });
    }
  }, []);

  let totalCarrito = 0;
  if (usuarioID) {
    totalCarrito = usuarioID.carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  }

  return (
    <section className="contenedor_carrito">
      <article>
        <h1 className="titulo_carrito">Carrito</h1>
        <div className="d-flex flex-column gap-3">
          {usuarioID && usuarioID.carrito.length > 0 ? (
            usuarioID.carrito.map((producto) => (
              <CarritoItem
                key={producto.id}
                producto={producto}
                usuarioID={usuarioID}
              />
            ))
          ) : (
            <div className="d-flex flex-column align-items-center">
              <h3 className="text-center">No hay productos en el carrito</h3>
              <img
                src="https://i.ibb.co/0jZ3Q0H/carrito-vacio.png"
                alt="carrito-vacio"
                border="0"
                className="img-fluid"
              />
            </div>
          )}
        </div>
        <div className="contenedor_botones w-100 d-flex justify-content-between mt-3">
          <button className="boton_vaciar">Vaciar carrito</button>
          <div className="d-flex align-items-center">
            <h5 className="mb-0">
              Total: $<span>{totalCarrito}</span>
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
