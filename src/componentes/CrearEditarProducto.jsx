import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { crearPlato, editarPlato, obtenerPlato } from "./ayudas/consultas";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const CrearEditarProducto = () => {
  const navegacion = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (id) {
      obtenerPlato(id).then((respuesta) => {
        setValue("imagen", respuesta.imagen);
        setValue("nombre", respuesta.nombre);
        setValue("precio", respuesta.precio);
        setValue("descripcion", respuesta.descripcion);
        setValue("stock", respuesta.stock);
        setValue("categoria", respuesta.categoria);
      });
    }
  }, []);

  const onSubmit = (platoEditado) => {
    if (id) {
      editarPlato(platoEditado, id).then((respuesta) => {
        if (respuesta.status === 200) {
          Swal.fire(
            "Producto modificado",
            `El producto ${platoEditado.nombre} fue modificado con exito`,
            "success"
          );
          navegacion("/administrador");
        } else {
          Swal.fire(
            "Error",
            `Intente realizar esta operacion mas tarde`,
            "error"
          );
        }
      });
    } else {
      crearPlato(platoEditado).then((respuesta) => {
        if (respuesta.status === 201) {
          Swal.fire(
            "Producto creado",
            `El plato ${platoEditado.nombre} fue creado con exito!`,
            "success"
          );
          reset();
        } else {
          Swal.fire(
            "Error",
            `Intente realizar esta operacion mas tarde`,
            "error"
          );
        }
      });
      reset();
    }
  };

  return (
    <section className="contenedor_EditarCrear">
      <h2 className="text-center text-light">
        {id ? "Editar Plato" : "Crear Plato"}
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="formCrearEditar pb-5">
        <Form.Group className="mb-3" controlId="input_imgPro">
          <label className="text-white mb-1">Imagen</label>
          <div className="text-center">
            <input
              type="text"
              placeholder="Imagen del Producto"
              className="input_CrearEditarpd"
              {...register("imagen", {
                required: "La imagen es obligatoria",
              })}
            />
          </div>

          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 " controlId="input_NombrePro">
          <label className="text-white mb-1">Nombre</label>
          <div className="text-center">
            <input
              type="text"
              placeholder="Nombre del Producto"
              className="input_CrearEditarpd"
              {...register("nombre", {
                required: "El nombre del producto es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad minima de caracteres es de 2 digitos",
                },
                maxLength: {
                  value: 100,
                  message:
                    "La cantidad maxima  de caracteres es de 100 digitos",
                },
              })}
            />
          </div>

          <Form.Text className="text-danger">
            {errors.nombre?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 " controlId="input_PrecioPro">
          <label className="text-white mb-1">Precio</label>
          <div className="text-center">
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
                },
              })}
            />
          </div>

          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Descripcion">
          <label className="text-white mb-1">Descripción</label>
          <div className="text-center">
            <textarea
              name="descripcion"
              id="descripcion"
              rows="3"
              placeholder="Descripción del producto"
              className="input_CrearEditarpd"
              {...register("descripcion", {
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
          </div>

          <Form.Text className="text-danger">
            {errors.descripcion?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <label className="text-white mb-1">Categoría</label>
          <div className="text-center">
            <select
              name="selecCategoria"
              id="selec_Categoria"
              className="input_CrearEditarpd"
              {...register("categoria", {
                required: "La Categoría es obligatoria",
              })}
            >
              <option value="">Categoría del producto</option>
              <option value="entradas">Entradas</option>
              <option value="postres">Postres</option>
              <option value="bebidasAlcoholicas">Bebidas Alcoholicas</option>
              <option value="bebidas">Bebidas</option>
              <option value="comidasVeganas">Comida Vegana</option>
            </select>
          </div>{" "}
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 " controlId="input_Stock">
          <label className="text-white mb-1">Stock</label>
          <div className="text-center">
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
                },
              })}
            />
          </div>

          <Form.Text className="text-danger">{errors.stock?.message}</Form.Text>
        </Form.Group>

        <div className="text-center">
          <button type="submit" className="btn_AgrProducto">
            {id ? "Editar Plato" : "Crear Plato"}
          </button>
        </div>
      </Form>
    </section>
  );
};
export default CrearEditarProducto;
