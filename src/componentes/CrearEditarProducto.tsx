import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { crearPlato, editarPlato } from "./ayudas/consultas";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActualizar } from "../features/actualizar/actualizarSlice";
import Swal from "sweetalert2";
import { ActualizarState, Producto, ProductosState } from "../types/types";

interface FormValues {
  _id: string;
  imagen: string;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: string | number;
  stock: string | number;
  cantidad: string;
  descuento: boolean;
}

const CrearEditarProducto = () => {
  const { id } = useParams();
  const productosState = useSelector(
    (state: ProductosState) => state.productos.productos
  );
  const actualizar = useSelector(
    (state: ActualizarState) => state.actualizar.actualizar
  );
  const navegacion = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    if (id) {
      const plato = productosState.find((prod) => prod._id === id);
      if (plato) {
        setValue("imagen", plato?.imagen);
        setValue("nombre", plato?.nombre);
        setValue("precio", plato?.precio);
        setValue("descripcion", plato?.descripcion);
        setValue("stock", plato?.stock);
        setValue("categoria", plato?.categoria);
      }
    }
  }, []);

  const verificarNombrePlato = (nombre: string) => {
    return productosState.some((plato) => plato?.nombre === nombre);
  };

  const onSubmit = (plato: Producto) => {
    if (id) {
      const nombreExiste = verificarNombrePlato(plato?.nombre);

      editarPlato(plato, id).then((respuesta) => {
        if (respuesta && respuesta.status === 200) {
          dispatch(setActualizar(!actualizar));
          Swal.fire(
            "Producto modificado",
            `El producto ${plato?.nombre} fue modificado con éxito.`,
            "success"
          ).then((res) => {
            if (res.isConfirmed) {
              navegacion("/administrador");
            }
          });
        } else {
          if (nombreExiste) {
            Swal.fire(
              "Error",
              `El plato ya existe, Introduzca un nombre diferente.`,
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              `Intente realizar esta operación más tarde.`,
              "error"
            );
          }
        }
      });
    } else {
      crearPlato(plato).then((respuesta) => {
        if (respuesta && respuesta.status === 201) {
          dispatch(setActualizar(!actualizar));
          Swal.fire({
            title: "Producto creado",
            text: `El producto ${plato?.nombre} fue creado con éxito.`,
            icon: "success",
            confirmButtonText: "Ir al administrador",
            cancelButtonText: "Seguir creando",
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              navegacion("/administrador");
            }
          });
          reset();
        } else {
          if (respuesta && respuesta.status === 400) {
            Swal.fire(
              "Error",
              `El plato ya existe, Introduzca un plato diferente.`,
              "error"
            );
          } else {
            Swal.fire(
              "Error",
              `Intente realizar esta operación más tarde.`,
              "error"
            );
          }
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
          <label className="text-white mb-1"> URL de Imagen</label>
          <div className="text-center">
            <input
              type="text"
              placeholder="Ej: https://img.freepi/-flor-morada_181624-25863.jpg"
              className="input_CrearEditarpd"
              {...register("imagen", {
                required: "La imágen es obligatoria",
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
                  message: "La cantidad mínima de caracteres es de 3 dígitos.",
                },
                maxLength: {
                  value: 100,
                  message:
                    "La cantidad máxima de caracteres es de 100 dígitos.",
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
                required: "El precio del producto es obligatorio.",
                min: {
                  value: 0,
                  message: "El precio mínimo es de $0.",
                },
                max: {
                  value: 10000,
                  message: "El precio máximo es de $10.000.",
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
              id="descripcion"
              rows={3}
              placeholder="Descripción del producto"
              className="input_CrearEditarpd"
              {...register("descripcion", {
                required: "La descripción del producto es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad mínima de caracteres es de 3 dígitos.",
                },
                maxLength: {
                  value: 800,
                  message:
                    "La cantidad máxima de caracteres es de 800 dígitos.",
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
              id="selec_Categoria"
              className="input_CrearEditarpd"
              {...register("categoria", {
                required: "La categoría es obligatoria",
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
                required: "El stock del producto es obligatorio",
                min: {
                  value: 0,
                  message: "El stock mínimo es de 0.",
                },
                max: {
                  value: 10000,
                  message: "El Stock máximo es de 10.000.",
                },
              })}
            />
          </div>

          <Form.Text className="text-danger">{errors.stock?.message}</Form.Text>
        </Form.Group>

        <div className="text-center">
          <button type="submit" className="boton_admin w-100">
            {id ? "Editar Plato" : "Crear Plato"}
          </button>
        </div>
      </Form>
    </section>
  );
};
export default CrearEditarProducto;
