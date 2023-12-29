export interface Login {
  mensaje: string;
  uid: string;
  status: number;
  nombre: string;
  email: string;
  imagen: string;
  estado: string;
  carrito: Carrito[];
  pedidos: Pedidos[];
  favoritos: string[];
  contrasenia?: string;
  rol: string;
}

export interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  imagen: string;
  estado: string;
  rol: string;
  pedidos: Pedidos[];
  favoritos: string[];
  carrito: Carrito[];
  contrasenia?: string;
  __v?: number;
}

export interface Carrito {
  _id: string;
  nombre: string;
  precio: number;
  cantidad: string;
  costoEnvio: number;
  imagen: string;
}

export interface Pedidos {
  total: number;
  nombresProductos: string[];
  email: string;
  estado: string;
  fecha: string;
  envio: number[];
  id: number;
}

export interface Producto {
  _id: string;
  nombre: string;
  imagen: string;
  precio: number;
  descripcion: string;
  stock: number | string;
  categoria: string | number;
  cantidad: number | string;
  descuento: boolean;
  __v?: number;
}

export interface UsuariosState {
  usuarios: {
    usuario: Usuario;
  };
  usuarios: {
    usuario: Usuario;
  };
}

export interface CargaState {
  carga: {
    carga: boolean;
  };
}

export interface ActualizarState {
  actualizar: {
    actualizar: boolean;
  };
}

export interface ProductosState {
  productos: {
    productos: Producto[];
  };
  producto: {
    producto: Producto;
  };
}
