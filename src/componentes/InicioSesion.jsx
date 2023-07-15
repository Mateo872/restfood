
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import fondo from '../complementos/imagenes/366291.jpg'

const InicioSesion = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = (usuarioRegistrado) => {

    }

    return (
        <div style={{
            backgroundImage: `url(${fondo})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh',

        }}
        >
            <Container className="d-flex align-items-center justify-content-center vh-100" >
                <Row className="w-100">
                    <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                        <h1 className="text-center text-white display-4" style={{ fontFamily: "Reenie Beanie, cursive" }}>Registro</h1>
                        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="form-group pt-3">
                                <Form.Label className='text-white' style={{ fontFamily: "Reenie Beanie, cursive" }}>Nombre de usuario:</Form.Label>
                                <Form.Control
                                    type="text"

                                    placeholder="Ingrese un nombre de usuario"{
                                    ...register('text', {
                                        required: 'El nombre de usuario es obligatorio'
                                    })
                                    }
                                />
                                <Form.Text className='text-danger'>
                                    {errors.text?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="form-group pt-3">
                                <Form.Label className='text-white' style={{ fontFamily: "Reenie Beanie, cursive" }}>Email:</Form.Label>
                                <Form.Control
                                    type="email"

                                    placeholder="Ingrese un email"{
                                    ...register('email', {
                                        required: 'El email es obligatorio'
                                    })
                                    }
                                />
                                <Form.Text className='text-danger'>
                                    {errors.email?.message}
                                </Form.Text>
                                <Form.Group className="form-group pt-3">
                                    <Form.Label className='text-white' style={{ fontFamily: "Reenie Beanie, cursive" }}>Imagen:</Form.Label>
                                    <Form.Control
                                        type="text"

                                        placeholder="Inserte una imagen"{
                                        ...register('text', {
                                            required: 'La imagen es obligatoria'
                                        })
                                        }
                                    />
                                    <Form.Text className='text-danger'>
                                        {errors.text?.message}
                                    </Form.Text>
                                </Form.Group>
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Label className="pt-3 text-white" style={{ fontFamily: "Reenie Beanie, cursive" }}>Contraseña:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    {
                                    ...register('password', {
                                        required: 'La contraseña es obligatoria'
                                    })
                                    }

                                />
                                <Form.Text className="text-danger">
                                    {errors.password?.message}
                                </Form.Text>
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="btn btn-primary  mt-3 text-center w-100"
                                style={{ backgroundColor: "#C7A17A", borderColor: "#C7A17A" }}
                            >
                                Registrarme
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
};
export default InicioSesion