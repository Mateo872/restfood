import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiTwotoneHourglass } from "react-icons/ai";

const ItemPedidos = () => {
  return (
    <tr>
      <td>usuario@gmail.com</td>
      <td>Hamburguesa doble</td>
      <td>Realizado</td>
      <td>11/07/2023</td>
      <td className="bg-transparent text-warning tdBtn">
        <BsFillCheckCircleFill className="iconoPausar me-2"></BsFillCheckCircleFill>
        <AiTwotoneHourglass className="iconoPausar" />
      </td>
    </tr>
  );
};

export default ItemPedidos;
