const ContenedorFiltros = () => {
  return (
    <div className="filtro_overlay vw-100 vh-100 d-flex align-items-end">
      <div className="contenedor_filtro">
        <div className="filtro_accion d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Filtros</h4>
          <p className="filtro_aceptar mb-0">Listo</p>
        </div>
        <div className="filtros">
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mb-0">Categorías</h5>
              <div className="input d-flex align-items-center gap-1 filtros_categorias">
                <input type="checkbox" name="entradas" id="entradas" />
                <label htmlFor="entradas">Entradas</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtros_categorias">
                <input type="checkbox" name="bebidas" id="bebidas" />
                <label htmlFor="bebidas">Bebidas</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtros_categorias">
                <input type="checkbox" name="postres" id="postres" />
                <label htmlFor="postres">Postres</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtros_categorias">
                <input
                  type="checkbox"
                  name="bebidasAlcoholicas"
                  id="bebidasAlcoholicas"
                />
                <label htmlFor="bebidasAlcoholicas">Bebidas alcohólicas</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtros_categorias">
                <input
                  type="checkbox"
                  name="comidasVeganas"
                  id="comidasVeganas"
                />
                <label htmlFor="comidasVeganas">Comidas veganas</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtros_categorias">
                <input type="checkbox" name="favoritos" id="favoritos" />
                <label htmlFor="favoritos">Favoritos</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtros_categorias">
                <input type="checkbox" name="stock" id="stock" />
                <label htmlFor="stock">Stock</label>
              </div>
            </div>
          </div>
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mb-0">Precio</h5>
              <div className="input d-flex align-items-center gap-1 filtro_precio">
                <input
                  type="checkbox"
                  name="gratis"
                  id="gratis"
                  className="gratis"
                />
                <label htmlFor="gratis">Gratis</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtro_precio">
                <input type="checkbox" name="bajo" id="bajo" />
                <label htmlFor="bajo">Hasta $499</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtro_precio">
                <input type="checkbox" name="medio" id="medio" />
                <label htmlFor="medio">Hasta $799</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtro_precio">
                <input type="checkbox" name="caro" id="caro" className="999" />
                <label htmlFor="caro">Hasta $1200</label>
              </div>
            </div>
          </div>
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mb-0">Ordenar por</h5>
              <div className="input d-flex align-items-center gap-1 filtro_ordenar">
                <input type="checkbox" name="bajo" id="bajo" />
                <label htmlFor="bajo">Menor precio</label>
              </div>
              <div className="d-flex align-items-center gap-1 filtro_ordenar">
                <div className="input">
                  <input type="checkbox" name="alto" id="alto" />
                  <label htmlFor="alto">Mayor precio</label>
                </div>
              </div>
            </div>
          </div>
          <div className="filtro">
            <div className="filtro_input d-flex flex-column">
              <h5 className="mb-0">Descuento</h5>
              <div className="input d-flex align-items-center gap-1 filtro_descuento">
                <input type="checkbox" name="descuento" id="descuento" />
                <label htmlFor="descuento">Sí</label>
              </div>
              <div className="input d-flex align-items-center gap-1 filtro_descuento">
                <input type="checkbox" name="noDescuento" id="noDescuento" />
                <label htmlFor="noDescuento">No</label>
              </div>
            </div>
          </div>
        </div>
        <div className="botones_filtro d-flex gap-2">
          <button className="button_secondary w-100">Borrar todo</button>
          <button className="button_primary w-100">Aplicar</button>
        </div>
      </div>
    </div>
  );
};

export default ContenedorFiltros;
