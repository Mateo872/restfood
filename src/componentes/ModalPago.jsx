import { BsCheck, BsChevronRight } from "react-icons/bs";

const ModalPago = () => {
  return (
    <div className="modal_pago">
      <div className="modal_pasos d-flex justify-content-center align-items-center gap-1">
        <div className="modal_paso d-flex justify-content-center align-items-center gap-1">
          <div className="paso_circulo d-flex justify-content-center align-items-center">
            <BsCheck className="check" />
          </div>
          <p className="mb-0">Detalle</p>
        </div>
        <BsChevronRight className="chevron" />
        <div className="modal_paso d-flex justify-content-center align-items-center gap-1">
          <div className="paso_circulo d-flex justify-content-center align-items-center">
            <BsCheck className="check" />
          </div>
          <p className="mb-0">Confirmar</p>
        </div>
      </div>
      <h3 className="text-center">Detalle de la compra</h3>
      <h4 className="text-center">
        Complete su compra proporcionando los detalles de su orden.
      </h4>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="position-relative">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="usuario@gmail.com"
              required
            />
            <div className="paso_circulo d-flex justify-content-center align-items-center">
              <BsCheck className="check" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tarjeta">Número de tarjeta</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="tarjeta"
              placeholder="1234 1234 1234 1234"
              required
            />
            <div className="paso_circulo d-flex justify-content-center align-items-center">
              <BsCheck className="check" />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-0">
          <div className="form_doble form-group">
            <label htmlFor="vencimiento">Fecha de vencimiento</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                id="vencimiento"
                placeholder="12/2026"
                required
              />
              <div className="paso_circulo d-flex justify-content-center align-items-center">
                <BsCheck className="check" />
              </div>
            </div>
            <p className="mb-0">Mes / Año</p>
          </div>
          <div className="form_doble form-group">
            <label htmlFor="codigoSeguridad">Código de seguridad</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                id="codigoSeguridad"
                placeholder="444"
                required
              />
              <div className="paso_circulo d-flex justify-content-center align-items-center">
                <BsCheck className="check" />
              </div>
            </div>
            <p className="mb-0">Los 3 números del dorso de tu tarjeta</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="dniTarjeta">DNI del titular de la tarjeta</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="dniTarjeta"
              placeholder="44021006"
              required
            />
            <div className="paso_circulo d-flex justify-content-center align-items-center">
              <BsCheck className="check" />
            </div>
          </div>
        </div>
        <button>CONTINUAR</button>
      </form>
    </div>
  );
};

export default ModalPago;
