import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <section className="pacman_contenedor d-flex align-items-center justify-content-center text-center">
      <article>
        <div className="pacman d-flex justify-content-center">
          <PacmanLoader
            color="#1e1e1e"
            size={window.innerWidth < 700 ? 45 : 97.5}
            loading
          />
        </div>
        <h1 style={{ fontWeight: "bold" }}>404</h1>
        <p className="pacman_texto">
          Página no encontrada, vuelve al{" "}
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
