import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { borrarPlato } from "./ayudas/consultas";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setActualizar } from "../features/actualizar/actualizarSlice";
import { ActualizarState, Producto } from "../types/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  platos: Producto;
  seleccion: boolean;
  setSeleccionados: Dispatch<SetStateAction<string[]>>;
  seleccionados: string[];
  setInput: Dispatch<SetStateAction<string>>;
}

const ItemProducto = ({
  platos,
  seleccion,
  setSeleccionados,
  seleccionados,
  setInput,
}: Props) => {
  const actualizar = useSelector(
    (state: ActualizarState) => state.actualizar.actualizar
  );
  const dispatch = useDispatch();

  const manejoSeleccion = () => {
    const existe = seleccionados.find((selec: string) => selec === platos._id);

    if (!existe) {
      setSeleccionados([...seleccionados, platos._id]);
    } else {
      const existe = seleccionados.filter(
        (selec: string) => selec !== platos._id
      );
      setSeleccionados(existe);
    }
  };

  const eliminarProducto = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el producto?",
      text: "Este paso no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarPlato(platos._id).then((res) => {
          if (res && res.status === 200) {
            Swal.fire(
              "Producto eliminado con éxito!",
              `El producto ${platos.nombre} fue eliminado.`,
              "success"
            ).then((result) => {
              if (result.isConfirmed) {
                dispatch(setActualizar(!actualizar));
                setInput("");
              }
            });
          } else {
            Swal.fire(
              "Se produjo un error",
              "Intente realizar esta operación más tarde.",
              "error"
            );
          }
        });
      }
    });
  };

  return (
    <Card className="card_producto text-center">
      <Card.Img
        variant="top"
        loading="lazy"
        className="cardImg"
        src={platos.imagen ? platos.imagen : "https://placehold.co/200x200"}
        alt={platos.nombre}
      />
      <Card.Title className="titulo_producto">{platos.nombre}</Card.Title>
      <div className={`${seleccion && "d-none"}`}>
        <Link
          to={`/administrador/producto/editar/${platos._id}`}
          className="boton_producto boton_editar m-1"
        >
          Editar
        </Link>
        <button
          className="boton_producto boton_eliminar m-1"
          onClick={eliminarProducto}
        >
          Eliminar
        </button>
      </div>
      <div
        className={`${
          seleccion ? "d-block" : "d-none"
        } d-flex justify-content-center`}
      >
        <button
          className="boton_producto boton_agregar m-1 w-50"
          onClick={manejoSeleccion}
        >
          {seleccionados.length > 0 &&
          seleccionados.find((selec: string) => selec === platos._id)
            ? "Cancelar"
            : "Seleccionar"}
        </button>
      </div>
    </Card>
  );
};

export default ItemProducto;
