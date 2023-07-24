import { useState } from "react";

const ContenedorFiltros = ({
  mostrarFiltro,
  setMostrarFiltro,
  filtros,
  setFiltros,
  precioMinimo,
  precioMaximo,
}) => {
  const [ordenarActivo, setOrdenarActivo] = useState(null);
  const [precio, setPrecio] = useState(null);
  const [favoritos, setFavoritos] = useState(null);
  const [descuento, setDescuento] = useState(null);

  const manejoCheckbox = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFiltros({
        ...filtros,
        categorias: [...filtros.categorias, name],
      });
    } else {
      setFiltros({
        ...filtros,
        categorias: filtros.categorias.filter(
          (categoria) => categoria !== name
        ),
      });
    }
  };

  const manejarPrecio = (e) => {
    const { name } = e.target;
    if (precio === name) {
      setPrecio(null);
      setFiltros({
        ...filtros,
        precio: [],
      });
    } else {
      setPrecio(name);
      setFiltros({
        ...filtros,
        precio: [name],
      });
    }
  };

  const manejarOrdenar = (e) => {
    const { name } = e.target;
    if (ordenarActivo === name) {
      setOrdenarActivo(null);
      setFiltros({
        ...filtros,
        ordenar: [],
      });
    } else {
      setOrdenarActivo(name);
      setFiltros({
        ...filtros,
        ordenar: [name],
      });
    }
  };

  const manejarStock = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFiltros({
        ...filtros,
        stock: [...filtros.stock, name],
      });
    } else {
      setFiltros({
        ...filtros,
        stock: filtros.stock.filter((stock) => stock !== name),
      });
    }
  };

  const manejarFavoritos = (e) => {
    const { name } = e.target;
    if (favoritos === name) {
      setFavoritos(null);
      setFiltros({
        ...filtros,
        favoritos: [],
      });
    } else {
      setFavoritos(name);
      setFiltros({
        ...filtros,
        favoritos: [name],
      });
    }
  };

  const manejarDescuento = (e) => {
    const { name } = e.target;
    if (descuento === name) {
      setDescuento(null);
      setFiltros({
        ...filtros,
        descuento: [],
      });
    } else {
      setDescuento(name);
      setFiltros({
        ...filtros,
        descuento: [name],
      });
    }
  };

  return (
    <div
      className="filtro_overlay vw-100 vh-100 d-flex align-items-end"
      style={{ visibility: mostrarFiltro ? "visible" : "hidden" }}
      onClick={(e) =>
        e.target.className.includes("filtro_overlay") &&
        setMostrarFiltro(!mostrarFiltro)
      }
    >
      <div
        className={`contenedor_filtro ${
          mostrarFiltro && "contenedor_filtro-activo"
        }`}
      >
        <div className="filtro_accion d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Filtros</h4>
          <p
            className="filtro_aceptar mb-0"
            onClick={() => setMostrarFiltro(!mostrarFiltro)}
          >
            Listo
          </p>
        </div>
        <div className="filtros">
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mt-md-2 mb-0">Categorías</h5>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="entradas"
                  id="entradas"
                  onChange={manejoCheckbox}
                />
                <label htmlFor="entradas">Entradas</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="bebidas"
                  id="bebidas"
                  onChange={manejoCheckbox}
                />
                <label htmlFor="bebidas">Bebidas</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="postres"
                  id="postres"
                  onChange={manejoCheckbox}
                />
                <label htmlFor="postres">Postres</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="bebidasAlcoholicas"
                  id="bebidasAlcoholicas"
                  onChange={manejoCheckbox}
                />
                <label htmlFor="bebidasAlcoholicas">Bebidas alcohólicas</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="comidasVeganas"
                  id="comidasVeganas"
                  onChange={manejoCheckbox}
                />
                <label htmlFor="comidasVeganas">Comidas veganas</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="stock"
                  id="stock"
                  onChange={manejarStock}
                />
                <label htmlFor="stock">Stock</label>
              </div>
            </div>
          </div>
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mb-0">Precio</h5>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="gratis"
                  id="gratis"
                  checked={precio === "gratis"}
                  onChange={manejarPrecio}
                />
                <label htmlFor="gratis">Gratis</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="bajo"
                  id="bajo"
                  checked={precio === "bajo"}
                  onChange={manejarPrecio}
                />
                <label htmlFor="bajo">Hasta ${precioMinimo + 200}</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="medio"
                  id="medio"
                  checked={precio === "medio"}
                  onChange={manejarPrecio}
                />
                <label htmlFor="medio">
                  ${precioMinimo + 200} a ${precioMaximo - precioMaximo / 2}
                </label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="caro"
                  id="caro"
                  checked={precio === "caro"}
                  onChange={manejarPrecio}
                />
                <label htmlFor="caro">
                  ${precioMaximo - precioMaximo / 2} a ${precioMaximo}
                </label>
              </div>
            </div>
          </div>
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mb-0">Ordenar por</h5>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="menor"
                  id="menor"
                  checked={ordenarActivo === "menor"}
                  onChange={manejarOrdenar}
                />
                <label htmlFor="menor">Menor precio</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="mayor"
                  id="mayor"
                  checked={ordenarActivo === "mayor"}
                  onChange={manejarOrdenar}
                />
                <label htmlFor="mayor">Mayor precio</label>
              </div>
            </div>
          </div>
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mb-0">Favoritos</h5>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="favoritos"
                  id="favoritos"
                  checked={favoritos === "favoritos"}
                  onChange={manejarFavoritos}
                />
                <label htmlFor="favoritos">Sí</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="noFavoritos"
                  id="noFavoritos"
                  checked={favoritos === "noFavoritos"}
                  onChange={manejarFavoritos}
                />
                <label htmlFor="noFavoritos">No</label>
              </div>
            </div>
          </div>
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mb-0">Descuento</h5>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="descuento"
                  id="descuento"
                  checked={descuento === "descuento"}
                  onChange={manejarDescuento}
                />
                <label htmlFor="descuento">Sí</label>
              </div>
              <div className="input d-flex align-items-center gap-1 ultimo">
                <input
                  type="checkbox"
                  name="noDescuento"
                  id="noDescuento"
                  checked={descuento === "noDescuento"}
                  onChange={manejarDescuento}
                />
                <label htmlFor="noDescuento">No</label>
              </div>
            </div>
          </div>
          <div className="botones_filtro d-flex gap-2">
            <button className="boton_secundario w-100">Borrar todo</button>
            <button className="boton_primario w-100">Aplicar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContenedorFiltros;
