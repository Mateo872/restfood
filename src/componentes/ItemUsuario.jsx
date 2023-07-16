import React from "react";
import toretto from "../complementos/imagenes/toretto.jpeg";
import { BsPauseCircleFill } from "react-icons/bs";

const ItemUsuario = () => {
  return (
    <tr>
      <td id="tdImg">
        <figure>
          <img src={toretto} alt="" />
        </figure>
      </td>
      <td>admin@admin.com</td>
      <td>Rolling</td>
      <td>Administrador</td>
      <td className="bg-transparent text-danger tdBtn">
        <BsPauseCircleFill className="iconoPausar"></BsPauseCircleFill>
      </td>
    </tr>
  );
};

export default ItemUsuario;
