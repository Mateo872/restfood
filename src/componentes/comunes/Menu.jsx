import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import TarjetaProducto from "../TarjetaProducto";
import { BsHandIndexThumbFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { obtenerPlatos } from "../ayudas/consultas";

const Menu = () => {
    const [busqueda, setBusqueda] = useState(false);
    const [producto, setProducto] = useState([]);
    const [resultados, setResultados] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        obtenerPlatos().then((res) => {
            setProducto(res);
            setBusqueda(true);
        });
    }, []);

    const onSubmit = (prod) => {
        // console.log(prod.producto);
        buscarProductos(prod.producto);
    };

    const buscarProductos = (productoBuscado) => {
        console.log(productoBuscado);
        if (!producto || !termino) {
            // Si producto o termino no tienen valor, no realizar la búsqueda
            console.log("no hay datos");
            setResultados([]);
            return;
        }
        // const resultadosFiltrados = producto.filter((prod) =>
        //     prod.nombre.includes(productoBuscado)
        // );
        // setResultados(resultadosFiltrados);
        // console.log(resultados);
    };

    return (
        <>
            <div className="menuConteiner"></div>
            <section className="menu-contenedor" id="productos">
                <Container className="menu-contenedor-body">
                    <h2 className="text-white text-center menu-titulo mb-5">Menu</h2>
                    <div className="d-flex flex-column flex-md-row flex-lg-row justify-content-between">
                        <p className="fs-3 col col-lg-6 text-center text-lg-start  mb-5 ">
                            Busca tus productos
                        </p>
                        <Form
                            className="d-flex col col-lg-6 justify-content-lg-end justify-content-center align-self-center"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Form.Group className="">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar"
                                    {...register("producto", {
                                        required:
                                            "Este dato es requerido para poder buscar",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "La busqueda debe tener al menos 2 caracteres",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message:
                                                "La busqueda debe tener como maximo 20 caracteres",
                                        },
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.producto?.message}
                                </Form.Text>
                            </Form.Group>
                            <Button type="submit" className="boton-menu">
                                <BsHandIndexThumbFill size={28} />
                            </Button>
                        </Form>
                    </div>
                    <hr className="text-white " />
                    <section className="container-menu-card">
                        <div className="row  justify-content-center gap-5 ">
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                        </div>
                    </section>
                </Container>
            </section>
        </>
    );
};

export default Menu;
