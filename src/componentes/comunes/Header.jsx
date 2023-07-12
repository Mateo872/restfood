import { useRef } from "react";
import { BiMenu } from "react-icons/bi";

const Header = () => {
  const menuCapaRef = useRef(null);
  const menuRef = useRef(null);

  const menuVisible = () => {
    menuCapaRef.current.classList.add("menu_capa-visible");
    menuRef.current.classList.add("ul-visible");
  };

  const menuOculto = (e) => {
    if (
      e.target.className.includes("menu_capa") ||
      e.target.className.includes("menu_link")
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
            className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between"
            ref={menuRef}
          >
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
            <div className="contenedor_usuario d-flex justify-content-center gap-1">
              <a className="menu_link" href="#">
                Iniciar sesión |{" "}
              </a>
              <a className="menu_link" href="#">
                Registrarse
              </a>
            </div>
          </ul>
        </div>
        {/* <div className="d-flex gap-1">
          <a href="#">Iniciar sesión | </a>
          <a href="#">Registrarse</a>
        </div> */}
        <BiMenu onClick={menuVisible} />
      </nav>
    </header>
  );
};

export default Header;
