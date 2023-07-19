import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import TarjetaProducto from "../TarjetaProducto";
import { BsHandIndexThumbFill } from "react-icons/bs";
import { useForm } from "react-hook-form";

const Menu = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (prod) => {
        console.log(prod);
        reset();
    };
    return (
        <>
            <div className="menuConteiner"></div>
            <section className="menu-contenedor" id="productos">
                <Container className="menu-contenedor-body">
                    <h2 className="text-white text-center menu-titulo mb-5">Menu</h2>
                    <div className="d-flex justify-content-between">
                        <p className="fs-3">Busca tus productos</p>
                        <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar"
                                    {...register("producto", {
                                        required:
                                            "Este dato es requerido para poder buscar",
                                        minLength: {
                                            value: 6,
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
                            <Button type="submit">
                                <BsHandIndexThumbFill size={28} className="boton-menu" />
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
