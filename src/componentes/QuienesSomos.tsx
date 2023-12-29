import comida from "../complementos/imagenes/comida-quienes-somos.webp";
import salon from "../complementos/imagenes/salon-quienes-somos.webp";

const QuienesSomos = () => {
  return (
    <section className="container-fluid">
      <div className="container contenedor-quienes-somos">
        <article className="row d-flex flex-sm-row-reverse mx-0">
          <aside className="d-flex col-12 col-md-6 mb-lg-0 p-0">
            <img
              className="d-block w-100 img-quienes-somos"
              src={salon}
              alt="First slide"
            />
          </aside>
          <aside className="col-12 col-md-6 text-center">
            <h3 className="quienes-somos-title">¿Quienes somos? </h3>
            <p className="quienes-somos-text">
              En RestFood, somos apasionados por la gastronomía y nos
              enorgullece ofrecer una experiencia culinaria excepcional a
              nuestros clientes. Fundado con el objetivo de deleitar los
              paladares más exigentes, nuestro restaurante se ha convertido en
              un destino gastronómico reconocido en Argentina.
            </p>
          </aside>
        </article>
        <article className="row my-0 mx-0">
          <aside className="d-flex col-12 col-md-6 mb-3 mb-lg-0 p-0">
            <img
              className="d-block w-100 img-quienes-somos"
              src={comida}
              alt="First slide"
            />
          </aside>
          <aside className="col-12 col-md-6 text-center mt-lg-5 pt-lg-3 pb-2">
            <h3 className="quienes-somos-title">¿Que hacemos?</h3>
            <p className="quienes-somos-text mb-5">
              En RestFood, nos dedicamos a ofrecer una experiencia gastronómica
              única y memorable. Nuestra cocina se caracteriza por su
              autenticidad y la cuidadosa selección de ingredientes de calidad.
              Nos enorgullece fusionar sabores tradicionales con técnicas
              innovadoras, creando platos que deleitan tanto a los amantes de la
              cocina clásica como a los paladares más aventureros.
            </p>
          </aside>
        </article>
      </div>
    </section>
  );
};

export default QuienesSomos;
