import { useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { BsX } from "react-icons/bs";

const Header = () => {
  const menuCapaRef = useRef(null);
  const menuRef = useRef(null);

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
      <nav className="d-flex align-items-center justify-content-between w-100">
        <a href="#" className="nav_marca">
          REST<span>FOOD</span>
        </a>
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
              <a className="menu_link" href="#">
                Productos
              </a>
            </li>
            <li>
              <a className="menu_link" href="#">
                Nosotros
              </a>
            </li>
            <li>
              <a className="menu_link" href="#">
                Contacto
              </a>
            </li>
            <li className="d-md-none">
              <a className="menu_link " href="#">
                Iniciar
              </a>
            </li>
            <li className="d-md-none">
              <a className="menu_link" href="#">
                Registrarse
              </a>
            </li>
          </ul>
        </div>
        <BiMenu onClick={menuVisible} className="d-md-none" />
        <div className="d-none d-md-flex align-items-center gap-1">
          <li>
            <a className="menu_link" href="#">
              Iniciar
            </a>
          </li>
          <span style={{ color: "#fff" }}>|</span>
          <li>
            <a className="menu_link" href="#">
              Registrarse
            </a>
          </li>
        </div>
      </nav>
    </header>
  );
};

export default Header;
