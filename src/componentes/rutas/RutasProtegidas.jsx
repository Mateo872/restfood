import Error404 from "../Error404";

const RutasProtegidas = ({ children }) => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario")) || null;

  if (!usuarioLogueado || usuarioLogueado.rol !== "administrador") {
    return <Error404 />;
  }
  return children;
};

export default RutasProtegidas;
