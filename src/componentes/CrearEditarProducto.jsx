import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
const CrearEditarProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <section className="contenedor_EditarCrear">
      
        <Form onSubmit={handleSubmit} className="formCrearEditar pb-5" >
          <Form.Group className="mb-3 text-center" controlId="input_imgPro">
            <input
              type="text"
              placeholder="Imagen del Producto"
              className="input_CrearEditarpd"
              {...register("imagen", {
                required: "La imagen es obligatoria",
              })}
            />
          </Form.Group>
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
          <Form.Group className="mb-3 text-center" controlId="input_NombrePro">
            <input
              type="text"
              placeholder="Nombre del Producto"
              className="input_CrearEditarpd"
              {...register("nombreProducto", {
                required: "El nombre del producto es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad minima de caracteres es de 2 digitos",
                },
                maxLength: {
                  value: 100,
                  message: "La cantidad minima de caracteres es de 2 digitos",
                },
              })}
            />
          </Form.Group>
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
          <Form.Group className="mb-3 text-center" controlId="input_PrecioPro">
            <input
              type="number"
              placeholder="Precio del producto"
              className="input_CrearEditarpd"
              {...register("precio", {
                required: "El precio del producto es obligatorio",
                min: {
                  value: 1,
                  message: "El precio minimo es de $1",
                },
                max: {
                  value: 10000,
                  message: "El precio maximo es de $10000",
                }
              })}
            />
          </Form.Group>
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
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
              {...register("descripcionProducto", {
                required: "La descripción del producto es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad minima de caracteres es de 2 digitos",
                },
                maxLength: {
                  value: 500,
                  message: "La cantidad minima de caracteres es de 500 digitos",
                },
              })}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3 text-center">
            <select
              name="selecCategoria"
              id="selec_Categoria"
              className="input_CrearEditarpd"
              {...register("categoria", {
                required: "La imagen es obligatoria",
              })}
            >
              <option value="">Cateoría del producto</option>
              <option value="salado">Salado</option>
              <option value="Dulce">Dulce</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </Form.Group>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
            
          </Form.Text>

          <Form.Group className="mb-3 text-center" controlId="input_Stock">
            <input
              type="number"
              placeholder="Stock del producto"
              className="input_CrearEditarpd"
              {...register("stock", {
                required: "El Stock del producto es obligatorio",
                min: {
                  value: 0,
                  message: "El stock minimo es de 0",
                },
                max: {
                  value: 10000,
                  message: "El Stock maximo es de 10000",
                }
              })}
            />
          </Form.Group>
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
          <div className="text-center">
            <button type="submit" className="btn_AgrProducto">
              Agregar Producto
            </button>
          </div>
        </Form>
      
    </section>
  );
};

export default CrearEditarProducto;
