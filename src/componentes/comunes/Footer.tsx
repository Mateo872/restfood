import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

type FormValues = {
  email: string;
};

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [enviandoEmail, setEnviandoEmail] = useState(false);

  const envio = () => {
    setEnviandoEmail(true);
    setTimeout(() => {
      setEnviandoEmail(false);
      Swal.fire({
        icon: "success",
        title: "Estamos procesando tu solicitud",
        text: "Gracias por suscribirte a nuestro boletín",
        showConfirmButton: false,
        timer: 2000,
      });
      reset();
    }, 2000);
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
                  <Link to={"/restfood/acerca"}>Acerca de nosotros</Link>
                </li>
                <li className="py-1">
                  <Link to={"/restfood/informacion"}>
                    Información de entrega
                  </Link>
                </li>
                <li className="py-1">
                  <Link to={"/restfood/politicas"}>
                    Políticas de privacidad
                  </Link>
                </li>
                <li className="py-1">
                  <Link to={"/restfood/terminos"}>Términos y condiciones</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 text-center text-md-start">
              <h3>MI CUENTA</h3>
              <ul className="list-unstyled">
                <li className="py-1">
                  <Link to={"/restfood/historial"}>Historial de pedidos</Link>
                </li>
                <li className="py-1">
                  <Link to={"/restfood/boletin"}>Boletín</Link>
                </li>
                <li className="py-1">
                  <Link to={"/restfood/reembolso"}>Reembolsos</Link>
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
                    id="email"
                    required
                    {...register("email", {
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
