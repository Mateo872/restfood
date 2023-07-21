import React, { useEffect, useState } from "react";
import ItemProducto from "./ItemProducto";
import ItemUsuario from "./ItemUsuario";
import ItemPedidos from "./ItemPedidos";
import { Link } from "react-router-dom";
import { obtenerPlatos } from "./ayudas/consultas";

const Administrador = () => {
  const [platos, setPlatos] = useState([]);
  useEffect(() => {
    obtenerPlatos().then((res) => {
      const todasCategorias = [
        ...res[0].categorias.entradas,
        ...res[0].categorias.bebidas,
        ...res[0].categorias.postres,
        ...res[0].categorias.bebidasAlcoholicas,
        ...res[0].categorias.comidasVeganas,
      ];
      setPlatos(todasCategorias);
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
      estado: "Pendiente",
    },
    {
      id: 2,
      email: "correo2@example.com",
      nombre: "Bocadillos de Tofu a la Barbacoa",
      estado: "Realizado",
    },
  ];

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
          <div className="botones d-flex align-items-center justify-content-between mb-3 mb-lg-5">
            <h2 className="admin_titulo mb-0">Productos</h2>
            <div className="d-flex align-items-center gap-1 w-100 justify-content-end">
              <a href="#" className="boton_admin boton_seleccionar">
                Seleccionar
              </a>
              <Link
                to={"/producto/crear"}
                className="boton_admin boton_agregar"
              >
                Agregar
              </Link>
            </div>
          </div>
          <div className="row row-cols-sm-1 row-cols-md-3 contenedorProductos justify-content-between">
            {platos?.map((plato) => (
              <ItemProducto key={plato.nombre} platos={plato} />
            ))}
          </div>
        </article>
        <article className="my-5">
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
        <article className="my-5">
          <h2 className="admin_titulo mb-3">Pedidos</h2>
          <div className="tabla_contenedor">
            <table className="tabla">
              <thead>
                <tr>
                  <th className="py-2">Email de usuario</th>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Estado</th>
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
