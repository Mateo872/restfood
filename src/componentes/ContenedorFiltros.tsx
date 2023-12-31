import { ChangeEvent, useState } from "react";
import { PropsFiltros } from "./Menu";

interface Props {
  mostrarFiltro: boolean | null;
  setMostrarFiltro: (arg: boolean) => void;
  filtros: PropsFiltros;
  setFiltros: (filtros: PropsFiltros) => void;
  precioMinimo: number;
  precioMaximo: number;
  setPaginaActual: (pag: number) => void;
  actualizarTitulo: (titulo: string) => void;
  setBusqueda: (busqueda: string) => void;
}

const ContenedorFiltros = ({
  mostrarFiltro,
  setMostrarFiltro,
  filtros,
  setFiltros,
  precioMinimo,
  precioMaximo,
  setPaginaActual,
  actualizarTitulo,
  setBusqueda,
}: Props) => {
  const [ordenarActivo, setOrdenarActivo] = useState<string | null>(null);
  const [precio, setPrecio] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<string | null>(null);
  const [descuento, setDescuento] = useState<string | null>(null);
  const [filtrosSeleccionados, setFiltrosSeleccionados] =
    useState<PropsFiltros>({
      categorias: [],
      precio: [],
      ordenar: [],
      stock: [],
      favoritos: [],
      descuento: [],
    });

  const todosLosFiltrosDesactivados = () => {
    return (
      filtrosSeleccionados.categorias.length === 0 &&
      filtrosSeleccionados.precio.length === 0 &&
      filtrosSeleccionados.ordenar.length === 0 &&
      filtrosSeleccionados.stock.length === 0 &&
      filtrosSeleccionados.favoritos.length === 0 &&
      filtrosSeleccionados.descuento.length === 0
    );
  };

  const manejoCategorias = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        categorias: [...filtrosSeleccionados.categorias, name],
      });
    } else {
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        categorias: filtrosSeleccionados.categorias.filter(
          (categoria) => categoria !== name
        ),
      });
    }
  };

  const manejarPrecio = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (precio === name) {
      setPrecio(null);
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        precio: [],
      });
    } else {
      setPrecio(name);
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        precio: [name],
      });
    }
  };

  const manejarOrdenar = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (ordenarActivo === name) {
      setOrdenarActivo(null);
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        ordenar: [],
      });
    } else {
      setOrdenarActivo(name);
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        ordenar: [name],
      });
    }
  };

  const manejarStock = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        stock: [...filtrosSeleccionados.stock, name],
      });
    } else {
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        stock: filtros.stock.filter((stock) => stock !== name),
      });
    }
  };

  const manejarFavoritos = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (favoritos === name) {
      setFavoritos(null);
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        favoritos: [],
      });
    } else {
      setFavoritos(name);
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        favoritos: [name],
      });
    }
  };

  const manejarDescuento = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (descuento === name) {
      setDescuento(null);
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        descuento: [],
      });
    } else {
      setDescuento(name);
      setFiltrosSeleccionados({
        ...filtrosSeleccionados,
        descuento: [name],
      });
    }
  };

  const resetearCheckboxes = () => {
    setPrecio(null);
    setOrdenarActivo(null);
    setFavoritos(null);
    setDescuento(null);
  };

  const resetearFiltros = () => {
    actualizarTitulo("Todos los productos");
    setFiltros({
      categorias: [],
      precio: [],
      ordenar: [],
      stock: [],
      favoritos: [],
      descuento: [],
    });
    setBusqueda("");
    setFiltrosSeleccionados({
      categorias: [],
      precio: [],
      ordenar: [],
      stock: [],
      favoritos: [],
      descuento: [],
    });
    resetearCheckboxes();
    setPaginaActual(1);
    setMostrarFiltro(!mostrarFiltro);
  };

  const convertirCamelCase = (texto: string) => {
    return texto
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const aplicarFiltros = () => {
    if (todosLosFiltrosDesactivados()) {
      resetearFiltros();
      resetearCheckboxes();
      filtrosSeleccionados.favoritos = [];
    } else {
      setFiltros(filtrosSeleccionados);
      setPaginaActual(1);
      if (filtrosSeleccionados.categorias.length === 0) {
        actualizarTitulo("Todos los productos");
      } else if (filtrosSeleccionados.categorias.length === 1) {
        actualizarTitulo(
          convertirCamelCase(filtrosSeleccionados.categorias[0].toString())
        );
      } else {
        const categoriasUnidas = filtrosSeleccionados.categorias
          .map((categoria) => convertirCamelCase(categoria.toString()))
          .join(", ");
        actualizarTitulo(categoriasUnidas);
      }
      if (favoritos === "favoritos") {
        actualizarTitulo("Tus favoritos");
      }
      if (descuento === "descuento") {
        actualizarTitulo("Con descuento");
      } else if (descuento === "noDescuento") {
        actualizarTitulo("Sin descuento");
      }
    }

    setMostrarFiltro(!mostrarFiltro);
  };

  return (
    <div
      className="filtro_overlay vw-100 vh-100 d-flex align-items-end"
      style={{ visibility: mostrarFiltro ? "visible" : "hidden" }}
      onClick={(e) =>
        (e.target as HTMLElement).className.includes("filtro_overlay") &&
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
                  checked={filtrosSeleccionados.categorias.includes("entradas")}
                  onChange={manejoCategorias}
                />
                <label htmlFor="entradas">Entradas</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="bebidas"
                  id="bebidas"
                  checked={filtrosSeleccionados.categorias.includes("bebidas")}
                  onChange={manejoCategorias}
                />
                <label htmlFor="bebidas">Bebidas</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="postres"
                  id="postres"
                  checked={filtrosSeleccionados.categorias.includes("postres")}
                  onChange={manejoCategorias}
                />
                <label htmlFor="postres">Postres</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="bebidasAlcoholicas"
                  id="bebidasAlcoholicas"
                  checked={filtrosSeleccionados.categorias.includes(
                    "bebidasAlcoholicas"
                  )}
                  onChange={manejoCategorias}
                />
                <label htmlFor="bebidasAlcoholicas">Bebidas alcohólicas</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="comidasVeganas"
                  id="comidasVeganas"
                  checked={filtrosSeleccionados.categorias.includes(
                    "comidasVeganas"
                  )}
                  onChange={manejoCategorias}
                />
                <label htmlFor="comidasVeganas">Comidas veganas</label>
              </div>
              <div className="input d-flex align-items-center gap-1">
                <input
                  type="checkbox"
                  name="stock"
                  id="stock"
                  checked={filtrosSeleccionados.stock.includes("stock")}
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
        </div>
        <div className="botones_filtro d-flex gap-2">
          <button className="boton_secundario w-100" onClick={resetearFiltros}>
            Borrar todo
          </button>
          <button className="boton_primario w-100" onClick={aplicarFiltros}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContenedorFiltros;
