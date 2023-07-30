import { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsHandbag, BsX, BsFillPencilFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { obtenerUsuario } from "../ayudas/consultas";

const Header = ({ usuarioLogueado, setUsuarioLogeado }) => {
  const navegacion = useNavigate();
  const menuCapaRef = useRef(null);
  const menuRef = useRef(null);
  const ubicacion = useLocation();
  const [scroll, setScroll] = useState(false);
  const [badge, setBadge] = useState(0);
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
  const [usuarioID, setUsuarioID] = useState(null);

  useEffect(() => {
    if (usuario && usuario._id) {
      obtenerUsuario(usuario._id).then((res) => {
        setUsuarioID(res);
      });
    }
  }, [usuario]);

  useEffect(() => {
    if (usuarioID) {
      const cantidadTotalProductos =
        usuarioID.rol === "usuario" &&
        usuarioID.carrito.length > 0 &&
        usuarioID.carrito?.reduce(
          (total, producto) => total + producto.cantidad,
          0
        );
      setBadge(cantidadTotalProductos);
    }
  }, [usuario]);

  const salir = () => {
    Swal.fire({
      html: `
        <div class="imagen-contenedor-swal mt-3">
        <a href="/usuario/iniciar" class="contenedor_editar position-absolute d-flex justify-content-center align-items-center">
          <i class="bi bi-pencil"></i>
        </a>
        <img class="w-100 h-100" src="${usuarioID?.imagen}" alt="${usuarioID?.nombre}" />
        </div>
        <h2 class="titulo-dialogo mt-3">${usuarioID?.nombre}</h2>
        <p class="texto-dialogo mb-0">¿Deseas cerrar sesión?</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sesión cerrada",
          text: "La sesión se cerró correctamente",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          sessionStorage.removeItem("usuario");
          setUsuarioLogeado({});
          navegacion("/");
        });
      }
    });
  };

  const manejarScroll = () => {
    if (window.scrollY >= 1) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", manejarScroll);
  }, []);

  const menuVisible = () => {
    menuCapaRef.current.classList.add("menu_capa-visible");
    menuRef.current.classList.add("ul-visible");
  };

  const menuOculto = (e) => {
    if (
      e.target.classList.contains("menu_capa") ||
      e.target.classList.contains("menu_link")
    ) {
      menuCapaRef.current.classList.remove("menu_capa-visible");
      menuRef.current.classList.remove("ul-visible");
    }
  };

  return (
    <header>
      <div
        className={`contenedor_publicidad ${
          ubicacion.pathname === "/" ? "d-block" : "d-none"
        }`}
      >
        <h6 className="mb-0 text-center d-flex align-items-center gap-4 justify-content-center">
          <span className="slider">ENVÍOS LAS 24H</span>
        </h6>
      </div>
      <nav
        className={`d-flex align-items-center justify-content-between w-100 ${
          scroll ? "mt-0" : "margen"
        } ${ubicacion.pathname !== "/" && "mt-0"}`}
        style={{
          backgroundColor: scroll
            ? "#C7A17A"
            : ubicacion.pathname !== "/"
            ? "#C7A17A"
            : "transparent",
        }}
      >
        <Link to={"/"} className="nav_marca">
          REST
          <span
            style={{
              color:
                scroll || (!scroll && ubicacion.pathname !== "/")
                  ? "#1e1e1e"
                  : "#C7A17A",
            }}
          >
            FOOD
          </span>
        </Link>
        <div
          className="menu_capa"
          ref={menuCapaRef}
          onClick={(e) => menuOculto(e)}
        >
          <ul
            className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4"
            ref={menuRef}
          >
            <div
              className="icono_cerrar d-md-none"
              onClick={() => {
                menuCapaRef.current.classList.remove("menu_capa-visible");
                menuRef.current.classList.remove("ul-visible");
              }}
            >
              <BsX />
            </div>
            <li>
              <a
                href="#productos"
                className={`${
                  ubicacion.pathname !== "/" && "d-none"
                } menu_link`}
              >
                Productos
              </a>
            </li>
            <li
              className={`${
                ubicacion.pathname === "/restfood/nosotros" && "d-none"
              }`}
            >
              <Link to={"/restfood/nosotros"} className="menu_link">
                Nosotros
              </Link>
            </li>
            <li>
              <a href="#footer" className="menu_link">
                Contacto
              </a>
            </li>
            {usuarioLogueado.email ? (
              <>
                {usuarioLogueado.rol === "administrador" ? (
                  <li className="d-flex d-md-none flex-column justify-content-end align-items-center gap-1 usuario_log">
                    <Link
                      to={"/administrador"}
                      className="menu_link link_admin p-0"
                    >
                      Administrador
                    </Link>
                    <div
                      className="d-flex flex-column align-items-center gap-1"
                      onClick={salir}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "1.2rem",
                          color: "#fff",
                        }}
                      >
                        {usuarioID?.nombre}
                      </p>
                      <div
                        style={{
                          width: "2.4rem",
                          height: "2.4rem",
                          borderRadius: "100%",
                          backgroundColor: "#fff",
                          order: -1,
                        }}
                      >
                        <img
                          className="w-100 h-100"
                          src={usuarioID?.imagen}
                          alt={usuarioID?.nombre}
                          style={{
                            objectFit: "cover",
                            backgroundPosition: "center",
                            borderRadius: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ) : (
                  <li className="d-flex d-md-none flex-column justify-content-end align-items-center gap-1 usuario_log">
                    <Link
                      to={"/usuario/carrito"}
                      className="menu_link link_admin p-0 position-relative order-1"
                    >
                      <BsHandbag />
                      {usuarioID?.rol === "usuario" &&
                      usuarioID?.carrito.length > 0 ? (
                        <div className="contenedor_badge d-flex justify-content-center align-items-center position-absolute">
                          <span>{badge}</span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </Link>
                    <div
                      className="d-flex flex-column align-items-center gap-1"
                      onClick={salir}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "1.2rem",
                          color: "#fff",
                        }}
                      >
                        {usuarioID?.nombre}
                      </p>
                      <div
                        style={{
                          width: "2.4rem",
                          height: "2.4rem",
                          borderRadius: "100%",
                          backgroundColor: "#fff",
                          order: -1,
                        }}
                      >
                        <img
                          className="w-100 h-100"
                          src={usuarioID?.imagen}
                          alt={usuarioID?.nombre}
                          style={{
                            objectFit: "cover",
                            backgroundPosition: "center",
                            borderRadius: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="d-md-none">
                  <Link to={"/usuario/iniciar"} className="menu_link">
                    Iniciar
                  </Link>
                </li>

                <li className="d-md-none">
                  <Link to={"/usuario/registrar"} className="menu_link">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <BiMenu onClick={menuVisible} className="d-md-none" />
        {usuarioLogueado.email ? (
          <>
            {usuarioLogueado.rol === "administrador" ? (
              <li className="d-none d-md-flex justify-content-end align-items-center gap-1 usuario_log">
                <Link
                  to={"/administrador"}
                  className="menu_link link_admin p-0"
                >
                  Administrador
                </Link>
                <div
                  className="d-flex align-items-center gap-1"
                  onClick={salir}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "1.2rem",
                      color: "#fff",
                    }}
                  >
                    | {usuarioID?.nombre}
                  </p>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "100%",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      className="w-100 h-100"
                      src={usuarioID?.imagen}
                      alt={usuarioID?.nombre}
                      style={{
                        objectFit: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </div>
              </li>
            ) : (
              <li className="d-none d-md-flex justify-content-end align-items-center gap-1 usuario_log">
                <Link
                  to={"/usuario/carrito"}
                  className="carrito_item position-relative"
                >
                  <BsHandbag />
                  {usuarioID?.rol === "usuario" &&
                    usuarioID?.carrito.length > 0 && (
                      <div className="contenedor_badge d-flex justify-content-center align-items-center position-absolute">
                        <span>{badge}</span>
                      </div>
                    )}
                </Link>
                <div
                  className="d-flex align-items-center gap-1"
                  onClick={salir}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "1.2rem",
                      color: "#fff",
                    }}
                  >
                    | {usuarioID?.nombre}
                  </p>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "100%",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      className="w-100 h-100"
                      src={usuarioID?.imagen}
                      alt={usuarioID?.nombre}
                      style={{
                        objectFit: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </div>
              </li>
            )}
          </>
        ) : (
          <div
            className="d-none d-md-flex
            } align-items-center gap-1"
          >
            <li>
              <Link
                to={"/usuario/iniciar"}
                className={`${
                  ubicacion.pathname === "/usuario/iniciar" && "d-none"
                } menu_link`}
              >
                Iniciar
              </Link>
            </li>
            <span style={{ color: "#fff" }}>|</span>
            <li>
              <Link
                to={"/usuario/registrar"}
                className={`${
                  ubicacion.pathname === "/usuario/registrar" && "d-none"
                } menu_link`}
              >
                Registrarse
              </Link>
            </li>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
