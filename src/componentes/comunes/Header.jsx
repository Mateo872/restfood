import { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const menuCapaRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const [scroll, setScroll] = useState(false);

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
          location.pathname === "/" ? "d-block" : "d-none"
        }`}
      >
        <h6 className="mb-0 text-center d-flex align-items-center gap-4 justify-content-center">
          <span className="slider">ENVÍOS GRATIS</span>
        </h6>
      </div>
      <nav
        className={`d-flex align-items-center justify-content-between w-100 ${
          scroll ? "mt-0" : "margen"
        } ${location.pathname !== "/" && "mt-0"}`}
        style={{
          backgroundColor: scroll
            ? "#C7A17A"
            : location.pathname !== "/"
            ? "#C7A17A"
            : "transparent",
        }}
      >
        <Link to={"/"} className="nav_marca">
          REST
          <span
            style={{
              color:
                scroll || (!scroll && location.pathname !== "/")
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
                className={`${location.pathname !== "/" && "d-none"} menu_link`}
              >
                Productos
              </a>
            </li>
            <li
              className={`${
                location.pathname === "/restfood/nosotros" && "d-none"
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
            <li className="d-md-none">
              <Link to={"/usuario/iniciar"} className="menu_link ">
                Iniciar
              </Link>
            </li>
            <li className="d-md-none">
              <Link to={"/usuario/registrar"} className="menu_link">
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
        <BiMenu onClick={menuVisible} className="d-md-none" />
        <div className="d-none d-md-flex align-items-center gap-1">
          <li>
            <Link to={"/usuario/iniciar"} className="menu_link">
              Iniciar
            </Link>
          </li>
          <span style={{ color: "#fff" }}>|</span>
          <li>
            <Link to={"/usuario/registrar"} className="menu_link">
              Registrarse
            </Link>
          </li>
        </div>
      </nav>
    </header>
  );
};

export default Header;
