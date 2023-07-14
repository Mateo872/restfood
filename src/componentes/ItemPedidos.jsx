import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const ItemPedidos = () => {
  return (
    <tr>
      <td>usuario@gmail.com</td>
      <td>Hamburguesa doble</td>
      <td>Realizado</td>
      <td>11/07/2023</td>
      <td className="bg-transparent text-warning tdBtn">
        <BsFillCheckCircleFill className="iconoPausar"></BsFillCheckCircleFill>
      </td>
    </tr>
  );
};

export default ItemPedidos;
