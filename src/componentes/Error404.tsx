import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import svg from "../complementos/imagenes/lock-alt.svg";

const Error404 = () => {
  const { id } = useParams();
  const ubicacion = useLocation();
  const navegacion = useNavigate();

  if (ubicacion.pathname === "/administrador") {
    Swal.fire({
      title: "Acceso denegado",
      text: "Tenés que ser administrador para acceder a esta página",
      icon: "error",
      confirmButtonText: "Aceptar",
      didClose: () => {
        Swal.fire({
          title: "Redireccionando",
          text: "Serás redireccionado al inicio",
          icon: "info",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          navegacion("/");
        });
      },
    });
  }

  return (
    <section className="pacman_contenedor d-flex align-items-center justify-content-center text-center">
      <article>
        {ubicacion.pathname !== "/administrador" ? (
          <>
            <div
              className="pacman d-flex justify-content-center"
              style={{ marginTop: !id && "5rem" }}
            >
              {!id ? (
                <PacmanLoader
                  color="#1e1e1e"
                  size={window.innerWidth < 700 ? 45 : 97.5}
                  loading
                />
              ) : (
                <div className="lds-hourglass"></div>
              )}
            </div>
            <h1
              style={{
                fontWeight: "bold",
              }}
            >
              {!id ? "404" : "Vaya."}
            </h1>
            <p className="pacman_texto">
              {!id ? "Página no encontrada" : "Producto no encontrado"}, vuelve
              al{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                <span
                  style={{
                    color: "#c7a17a",
                    fontWeight: "bold",
                  }}
                >
                  inicio
                </span>
              </Link>
              .
            </p>
          </>
        ) : (
          <img className="svg_error" src={svg} alt="svg" />
        )}
      </article>
    </section>
  );
};

export default Error404;
