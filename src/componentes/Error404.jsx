import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Error404 = () => {
  const { id } = useParams();
  return (
    <section className="pacman_contenedor d-flex align-items-center justify-content-center text-center">
      <article>
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
          {!id ? "Página no encontrada" : "Producto no encontrado"}, vuelve al{" "}
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
      </article>
    </section>
  );
};

export default Error404;
