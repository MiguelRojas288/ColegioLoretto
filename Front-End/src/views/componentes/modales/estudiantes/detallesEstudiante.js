import { useContext } from 'react'
import { Modal, ModalBody, ModalHeader, Button, Form, Label, Input, Card, CardBody, Row, Col } from 'reactstrap'
import { X } from 'react-feather'

// context
import { Context } from '../../../context/Context'

const ComponenteModalDetallesEstudiante = () => {

    const { objetoAuxEstudiantes, formModalStateDetalles, setFormModalStateDetalles } = useContext(Context)

    return (
        <Modal isOpen={formModalStateDetalles} toggle={() => setFormModalStateDetalles(!formModalStateDetalles)} className='modal-dialog-centered' >
            <ModalHeader toggle={() => setFormModalStateDetalles(!formModalStateDetalles)} className='text-primary'>Detalles del Estudiante</ModalHeader>
            <Card>
                <CardBody>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col xl='12' md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nombre'> Nombre Completo </Label>
                                        <Input value={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.nombre : 'Sin Datos'} disabled/>
                                    </div>
                                </Col>

                                <Col xl='5' md='5' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='curso'> Curso</Label>
                                        <Input value={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.curso : 'Sin Datos'} disabled/>
                                    </div>
                                </Col>

                                <Col xl='2' md='2' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='edad'> Edad </Label>
                                        <Input value={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.edad : 'Sin Datos'} disabled/>
                                    </div>
                                </Col>

                                <Col xl='5' md='5' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='sexo'> Sexo</Label>
                                        <Input value={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.sexo : 'Sin Datos'} disabled/>
                                    </div>
                                </Col>

                                <Col xl='6' md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nomPadre'> Nombre del Padre </Label>
                                        <Input value={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.nomPadre : 'Sin Datos'} disabled/>
                                    </div>
                                </Col>
                                
                                <Col xl='6' md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nomMadre'> Nombre de la Madre </Label>
                                        <Input value={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.nomMadre : 'Sin Datos'} disabled/>
                                    </div>
                                </Col>

                            
                            </Row>

                            <br/>
                            <div className='d-flex align-items-center justify-content-center'>
                                <Button outline color='primary' onClick={() => (setFormModalStateDetalles(!formModalStateDetalles))}>
                                    <X size={15} />
                                    {" "}<span className='align-middle ml-25'>Cerrar</span>
                                </Button>
                            </div>
                        </Form>
                    </ModalBody>  
                </CardBody>
            </Card>     
        </Modal>
    )
}

export default ComponenteModalDetallesEstudiante