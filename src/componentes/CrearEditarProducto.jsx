import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
const CrearEditarProducto = () => {
  return (
    <section className="contenedor_EditarCrear">
      <Form>
      <Form.Group className="mb-3 text-center" controlId="input_imgPro">
          <input
            type="text"
            placeholder="Imagen del Producto"
            className="input_CrearEditarpd"
          />
        </Form.Group>
        <Form.Group className="mb-3 text-center" controlId="input_NombrePro">
          <input
            type="text"
            placeholder="Nombre del Producto"
            className="input_CrearEditarpd"
          />
        </Form.Group>
        <Form.Group className="mb-3 text-center" controlId="input_PrecioPro">
          <input
            type="number"
            placeholder="Precio del producto"
            className="input_CrearEditarpd"
          />
        </Form.Group>
        <Form.Group
          className="mb-3 text-center"
          controlId="DescripcionProducto"
        >
          <textarea
            name="descripcion"
            id="descripcionProducto"
            rows="3"
            placeholder="Descripción del producto"
            className="input_CrearEditarpd"
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <select name="selecCategoria" id="selec_Categoria" className="input_CrearEditarpd">
            <option value="">Cateoría del producto</option>
            <option value="salado">Salado</option>
            <option value="Dulce">Dulce</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </Form.Group>

        <Form.Group className="mb-3 text-center" controlId="input_Stock">
          <input
            type="number"
            placeholder="Stock del producto"
            className="input_CrearEditarpd"
          />
        </Form.Group>
        <div className="text-center">
            <button type="submit" className="btn_AgrProducto">Agregar Producto</button>
        </div>
      </Form>
      
    </section>
  );
};

export default CrearEditarProducto;
