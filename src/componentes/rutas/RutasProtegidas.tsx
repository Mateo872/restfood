import { ReactNode } from "react";
import Error404 from "../Error404";

const RutasProtegidas = ({ children }: { children: ReactNode }) => {
  const usuarioLogueado = sessionStorage.getItem("usuario");
  const usuarioLS = usuarioLogueado ? JSON.parse(usuarioLogueado) : null;

  if (!usuarioLS || usuarioLS.rol !== "administrador") {
    return <Error404 />;
  }
  return children;
};

export default RutasProtegidas;
