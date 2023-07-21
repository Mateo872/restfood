import { useForm } from "react-hook-form";
import { useState } from "react";

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [enviandoEmail, setEnviandoEmail] = useState(false);

  const envio = (data) => {
    setEnviandoEmail(true);
  };

  return (
    <>
      <footer className="mt-auto" id="footer">
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col-md-4 text-center text-md-start">
              <h3>INFORMACIÓN</h3>
              <ul className="list-unstyled">
                <li className="py-1">
                  <a href="#">Acerca de nosotros</a>
                </li>
                <li className="py-1">
                  <a href="#">Información de entrega</a>
                </li>
                <li className="py-1">
                  <a href="#">Políticas de privacidad</a>
                </li>
                <li className="py-1">
                  <a href="#">Términos y condiciones</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 text-center text-md-start">
              <h3>MI CUENTA</h3>
              <ul className="list-unstyled">
                <li className="py-1">
                  <a href="#">Historial de pedidos</a>
                </li>
                <li className="py-1">
                  <a href="#">Boletín</a>
                </li>
                <li className="py-1">
                  <a href="#">Reembolsos</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 text-center text-md-start">
              <h3 className="text-decoration-none">BOLETÍN INFORMATIVO</h3>
              <p className="text-center text-md-start">
                Suscríbete a nuestros boletines ahora y mantente al día con
                ofertas exclusivas.
              </p>
              <form onSubmit={handleSubmit(envio)}>
                <div>
                  <input
                    type="email"
                    className="form-control w-100"
                    placeholder="Ingrese el correo electrónico"
                    id="user_email"
                    required
                    {...register("user_email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        message:
                          "Por favor, introduce una dirección de correo electrónico válida",
                      },
                      minLength: 5,
                      maxLength: 100,
                    })}
                  />
                  <div className="text-danger mt-2 texto_email">
                    {errors.email?.message}
                  </div>
                </div>
                <button className="w-100" type="submit">
                  {enviandoEmail ? "Enviando..." : "Enviar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
