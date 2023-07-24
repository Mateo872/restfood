import { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsHandbag, BsX } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = ({ usuarioLogueado, setUsuarioLogeado }) => {
  const menuCapaRef = useRef(null);
  const menuRef = useRef(null);
  const ubicacion = useLocation();
  const [scroll, setScroll] = useState(false);
  const navegacion = useNavigate();

  const salir = () => {
    Swal.fire({
      html: `
      <div class="imagen-contenedor-swal">
        <img class="w-100 h-100" src="${usuarioLogueado.imagen}" alt="${usuarioLogueado.nombre}" />
      </div>
      <h2 class="titulo-dialogo mt-3">Hola, ${usuarioLogueado.nombre}</h2>
      <p class="texto-dialogo mb-0">¿Deseas cerrar sesión?</p>
    `,
      showCancelButton: true,
      showCancelButton: true,
      confirmButtonColor: "#c7a17a",
      cancelButtonColor: "#1e1e1e",
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("usuario");
        setUsuarioLogeado({});
        navegacion("/");
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
          <span className="slider">ENVÍOS GRATIS</span>
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
                {usuarioLogueado.rol === "Administrador" ? (
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
                        {usuarioLogueado.nombre}
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
                          src={usuarioLogueado.imagen}
                          alt={usuarioLogueado.nombre}
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
                      className="menu_link link_admin p-0 position-relative"
                    >
                      <BsHandbag />
                      <div className="contenedor_badge d-flex justify-content-center align-items-center position-absolute">
                        <span>2</span>
                      </div>
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
                        {usuarioLogueado.nombre}
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
                          src={usuarioLogueado.imagen}
                          alt={usuarioLogueado.nombre}
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
            {usuarioLogueado.rol === "Administrador" ? (
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
                    | {usuarioLogueado.nombre}
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
                      src={usuarioLogueado.imagen}
                      alt={usuarioLogueado.nombre}
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
                  <div className="contenedor_badge d-flex justify-content-center align-items-center position-absolute">
                    <span>2</span>
                  </div>
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
                    | {usuarioLogueado.nombre}
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
                      src={usuarioLogueado.imagen}
                      alt={usuarioLogueado.nombre}
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
