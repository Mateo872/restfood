import { useEffect, useState } from "react";
import CarritoItem from "./CarritoItem";
import ModalPago from "./ModalPago";
import Swal from "sweetalert2";
import {
  actualizarStockProducto,
  editarUsuario,
  obtenerUsuario,
} from "./ayudas/consultas";
import { Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const ContenedorCarrito = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioID, setUsuarioID] = useState(null);
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
  const [mostrarSpinner, setMostrarSpinner] = useState(true);
  const [mostrarCarrito, setMostrarCarrito] = useState(true);
  const navegacion = useNavigate();

  useEffect(() => {
    if (usuario && usuario.id) {
      obtenerUsuario(usuario.id)
        .then((res) => {
          setUsuarioID(res);
        })
        .finally(() => {
          setMostrarSpinner(false);
        });
    } else {
      setMostrarSpinner(false);
    }
  }, [usuarioID]);

  let totalCarrito = 0;
  if (usuarioID) {
    totalCarrito = usuarioID.carrito.reduce(
      (total, producto) =>
        total + producto.precio * producto.cantidad + producto.costoEnvio,
      0
    );
  }

  const vaciarCarrito = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El carrito se vaciará",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const carritoActualizado = usuarioID?.carrito || [];

        carritoActualizado.forEach(async (producto) => {
          await actualizarStockProducto(producto.id, producto.cantidad);
        });
        const usuarioActualizado = {
          ...usuarioID,
          carrito: [],
        };

        Swal.fire(
          "Carrito vaciado",
          "El carrito se vació correctamente",
          "success"
        ).then(async (result) => {
          if (result.isConfirmed) {
            await editarUsuario(usuarioActualizado, usuarioID.id);
            setUsuarioID(usuarioActualizado);
          }
        });
      }
    });
  };

  return (
    <section className="contenedor_carrito">
      <article>
        {usuarioID ? (
          <>
            {usuarioID && usuarioID.carrito.length > 0 && (
              <h1 className="titulo_carrito">Carrito</h1>
            )}
            <div className="d-flex flex-column gap-3">
              {mostrarSpinner ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                  <ClipLoader
                    color="#1e1e1e"
                    loading={mostrarSpinner}
                    size={35}
                  />
                </div>
              ) : usuarioID && usuarioID.carrito.length > 0 ? (
                usuarioID?.carrito.map((producto, index) => (
                  <CarritoItem
                    key={index}
                    producto={producto}
                    usuarioID={usuarioID}
                  />
                ))
              ) : (
                <div className="contenedor_carrito-vacio d-flex flex-column align-items-center">
                  <h3 className="text-center">
                    No hay productos en el carrito
                  </h3>
                  <GiShoppingBag />
                  <Link to={"/"}>Sumá productos</Link>
                </div>
              )}
            </div>
            {usuarioID && usuarioID.carrito.length > 0 && (
              <div className="contenedor_botones w-100 d-flex justify-content-between mt-3">
                <button className="boton_vaciar" onClick={vaciarCarrito}>
                  Vaciar carrito
                </button>
                <div className="d-flex">
                  <h5 className="mb-0">
                    Total: $<span>{totalCarrito.toLocaleString()}</span>
                  </h5>
                  <button
                    className="boton_comprar"
                    onClick={() => setMostrarModal(!mostrarModal)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            )}
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
                  totalCarrito={totalCarrito}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          navegacion("/usuario/iniciar")
        )}
      </article>
    </section>
  );
  return (
    <section className="contenedor_carrito">
      <article>
        {usuarioID ? (
          <>
            {usuarioID && usuarioID.carrito.length > 0 && (
              <h1 className="titulo_carrito">Carrito</h1>
            )}
            <div className="d-flex flex-column gap-3">
              {mostrarSpinner ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                  <ClipLoader
                    color="#1e1e1e"
                    loading={mostrarSpinner}
                    size={35}
                  />
                </div>
              ) : mostrarCarrito &&
                usuarioID &&
                usuarioID.carrito.length > 0 ? (
                usuarioID?.carrito.map((producto, index) => (
                  <CarritoItem
                    key={index}
                    producto={producto}
                    usuarioID={usuarioID}
                  />
                ))
              ) : (
                <div className="contenedor_carrito-vacio d-flex flex-column align-items-center">
                  <h3 className="text-center">
                    No hay productos en el carrito
                  </h3>
                  <GiShoppingBag />
                  <Link to={"/"}>Sumá productos</Link>
                </div>
              )}
            </div>
            {mostrarCarrito && usuarioID && usuarioID.carrito.length > 0 && (
              <div className="contenedor_botones w-100 d-flex justify-content-between mt-3">
                <button className="boton_vaciar" onClick={vaciarCarrito}>
                  Vaciar carrito
                </button>
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
            )}
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
                  totalCarrito={totalCarrito}
                  setMostrarCarrito={setMostrarCarrito}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          navegacion("/usuario/iniciar")
        )}
      </article>
    </section>
  );
};

export default ContenedorCarrito;
