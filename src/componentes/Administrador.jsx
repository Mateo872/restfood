import { useEffect, useState } from "react";
import ItemProducto from "./ItemProducto";
import ItemUsuario from "./ItemUsuario";
import ItemPedidos from "./ItemPedidos";
import { Link } from "react-router-dom";
import { obtenerPlatos } from "./ayudas/consultas";

const Administrador = () => {
  const [input, setInput] = useState("");
  const [platos, setPlatos] = useState([]);
  const [seleccion, setSeleccion] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    obtenerPlatos().then((res) => {
      setPlatos(res);
    });
  }, []);

  const data = [
    {
      id: 1,
      image: "url_de_la_imagen_1",
      email: "correo1@example.com",
      nombre: "Nombre 1",
      rol: "Administrador",
    },
    {
      id: 2,
      image: "url_de_la_imagen_2",
      email: "correo2@example.com",
      nombre: "Nombre 2",
      rol: "Usuario",
    },
  ];
  const dataPedidos = [
    {
      id: 1,
      email: "correo1@example.com",
      nombre: "Hamburguesa doble",
      fecha: "11/07/2023",
      estado: "Pendiente",
    },
    {
      id: 2,
      email: "correo2@example.com",
      nombre: "Bocadillos de Tofu a la Barbacoa",
      fecha: "11/07/2023",
      estado: "Realizado",
    },
  ];

  const manejoBuscador = (e) => {
    setInput(e.target.value);
  };

  const platosFiltrados = platos.filter((producto) =>
    producto.nombre.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="fondo">
      <section className="text-white text-center p-5 mt-5">
        <h1>Hola, Rolling</h1>
        <p>Como administrador, tus responsabilidades pueden incluir:</p>
        <ol>
          <li className="text-center">Administrar los usuarios.</li>
          <li className="text-center">Supervisar los productos.</li>
          <li className="text-center">Controlar los pedidos.</li>
        </ol>
      </section>
      <section className="text-white bg-dark contenedorAdministracion">
        <article>
          <div className="botones d-flex justify-content-end mb-3">
            <input
              type="text"
              placeholder="Busca tus productos"
              onChange={manejoBuscador}
              value={input}
              className="input_menu"
            />
          </div>
          <div className="botones d-flex align-items-center justify-content-between mb-3 mb-lg-5">
            <h2 className="admin_titulo mb-0">Productos</h2>
            <div className="d-flex align-items-center gap-1 w-100 justify-content-end">
              <button
                className="boton_admin boton_seleccionar"
                onClick={() => setSeleccion(!seleccion)}
              >
                {seleccion ? "Cancelar" : "Seleccionar"}
              </button>
              {!seleccion ? (
                <Link
                  to={"/administrador/producto/crear"}
                  className="boton_admin boton_agregar"
                >
                  Agregar
                </Link>
              ) : (
                <button className="boton_admin boton_eliminar-todos">
                  Eliminar
                </button>
              )}
            </div>
          </div>
          <div
            className="row row-cols-sm-1 row-cols-md-3 contenedorProductos"
            style={{
              justifyContent:
                platosFiltrados.length < 3 && platosFiltrados.length !== 0
                  ? "center"
                  : "space-between",
              height: platosFiltrados.length < 6 && "auto",
            }}
          >
            {platosFiltrados.length > 0 ? (
              platosFiltrados.map((plato) => (
                <ItemProducto
                  key={plato.nombre}
                  platos={plato}
                  setPlatos={setPlatos}
                  setInput={setInput}
                  seleccion={seleccion}
                  seleccionados={seleccionados}
                  setSeleccionados={setSeleccionados}
                />
              ))
            ) : (
              <p className="botones">No hay productos</p>
            )}
          </div>
        </article>
        <article className="botones my-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="admin_titulo mb-0">Usuarios</h2>
            <Link to={"/usuario/registrar"} className="boton_admin">
              Agregar
            </Link>
          </div>
          <div className="tabla_contenedor">
            <table className="tabla">
              <thead>
                <tr>
                  <th className="py-2">Imágen</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Rol</th>
                  <th className="py-2">Acciones</th>
                </tr>
              </thead>
              <ItemUsuario data={data} />
            </table>
          </div>
        </article>
        <article className="botones my-5">
          <h2 className="admin_titulo mb-3">Pedidos</h2>
          <div className="tabla_contenedor">
            <table className="tabla">
              <thead>
                <tr>
                  <th className="py-2">Email de usuario</th>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Fecha</th>
                  <th className="py-2">Acciones</th>
                </tr>
              </thead>
              <ItemPedidos dataPedidos={dataPedidos} />
            </table>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Administrador;
