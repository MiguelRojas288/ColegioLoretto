import { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader, Button, Form, Label, Input, FormFeedback, Card, CardBody, Row, Col } from 'reactstrap'
import { Save, X } from 'react-feather'

// context
import { Context } from '../../../context/Context'

// metodos
import metodoPut from '../../../servicios/peticionesHTTP/put'
import metodoGet from '../../../servicios/peticionesHTTP/get'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import ComponenteHandleEdit from '../../../componentes/handle/handleEdit'
import ComponenteHandleWarning from '../../../componentes/handle/handleWarning'

// ** Utils
import { selectThemeColors } from '@utils'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'


const ComponenteModalEditarEstudiante = () => {

    const userToken = JSON.parse(sessionStorage.getItem('User'))
    const modulo = 'estudiantes'

    const cursos = [
        { value : '5ºA - Primaria', label : '5ºA - Primaria' },
        { value : '5ºB - Primaria', label : '5ºB - Primaria' },
        { value : '6ºA - Primaria', label : '6ºA - Primaria' },
        { value : '6ºB - Primaria', label : '6ºB - Primaria' }
    ]

    const { objetoAuxEstudiantes, formModalStateEditar, setFormModalStateEditar, setDataEstudiantes, setDataAuxiliarEstudiantes } = useContext(Context)

    const SignupSchema = yup.object().shape({
        nombre: yup.string().required('El nombre es requerido').min(2, 'Mínimo 2 caracteres'),
        edad: yup.string().required('Edad requerida').min(1, 'Mínimo 1 caracteres').max(2, 'Máximo 2 caracteres'),
        nomPadre: yup.string().required('Nombre del padre requerido').min(2, 'Mínimo 2 caracteres'),
        nomMadre: yup.string().required('Nombre de la madre requerido').min(2, 'Mínimo 2 caracteres'),
    })
    
    // ** Hooks
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const llamarMetodoGet = async () => {
        const data = await metodoGet(modulo, userToken.token)
        setDataEstudiantes(data.estudiantes)
        setDataAuxiliarEstudiantes(data.estudiantes)
    }

    const llamarMetodoPut = async (datos) => {
        const res = await metodoPut(modulo, userToken.token, objetoAuxEstudiantes.id, datos)

        if (res.ok === true) {
            ComponenteHandleEdit()
            // se consulta la data de nuevo
            llamarMetodoGet()
        } else if (res.ok === false) {
            ComponenteHandleWarning()
        }
    }

    const onSubmit = data => {
        
        const aux = {
            body: JSON.stringify({
                nombre: data.nombre,
                curso: (data.curso !== undefined ? data.curso.value : objetoAuxEstudiantes.curso),
                edad: data.edad,
                sexo: objetoAuxEstudiantes.sexo,
                nomPadre: data.nomPadre,
                nomMadre: data.nomMadre
            })
        }
        // console.log(aux)
        llamarMetodoPut(aux)
        setFormModalStateEditar(!formModalStateEditar)
    }

    return (
        <Modal isOpen={formModalStateEditar} toggle={() => setFormModalStateEditar(!formModalStateEditar)} className='modal-dialog-centered' >
            <ModalHeader toggle={() => setFormModalStateEditar(!formModalStateEditar)} className='text-primary'>Editar Estudiante</ModalHeader>
            <Card>
                <CardBody>
                    <ModalBody>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>

                                <Col xl='12' md='12' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nombre'> Nombre Completo</Label>
                                        <Controller
                                            id='nombre'
                                            name='nombre'
                                            defaultValue={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.nombre : 'Sin Datos'}
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} 
                                                    placeholder='(Obligatorio)' invalid={errors.nombre && true} />
                                            )}
                                        />
                                        {errors.nombre && <FormFeedback>{errors.nombre.message}</FormFeedback>}
                                    </div>
                                </Col>

                                <Col xl='8' md='8' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='curso'> Curso </Label>
                                        <Controller
                                            id='react-select'
                                            control={control}
                                            name='curso'
                                            render={({ field }) => (
                                                <Select
                                                    isClearable={false}
                                                    options={cursos}
                                                    // defaultValue={colourOptions[0]}
                                                    placeholder={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.curso : 'Sin Datos'}
                                                    classNamePrefix='select'
                                                    theme={selectThemeColors}
                                                    className={classnames('react-select', { 'is-invalid': errors.curso && true})}
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.curso && <FormFeedback>{errors.curso.message}</FormFeedback>}
                                    </div>
                                </Col>

                                <Col xl='4' md='4' sm='4'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='edad'> Edad</Label>
                                        <Controller
                                            id='edad'
                                            name='edad'
                                            defaultValue={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.edad : 'Sin Datos'}
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} 
                                                    placeholder='(Opcional)' type='number' invalid={errors.edad && true} />
                                            )}
                                        />
                                        {errors.edad && <FormFeedback>{errors.edad.message}</FormFeedback>}
                                    </div>
                                </Col>
                                
                                <Col xl='6' md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nomPadre'> Nombre del Padre</Label>
                                        <Controller
                                            id='nomPadre'
                                            name='nomPadre'
                                            defaultValue={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.nomPadre : 'Sin Datos'}
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} 
                                                    placeholder='(Obligatorio)' invalid={errors.nomPadre && true} />
                                            )}
                                        />
                                        {errors.nomPadre && <FormFeedback>{errors.nomPadre.message}</FormFeedback>}
                                    </div>
                                </Col>

                                
                                <Col xl='6' md='6' sm='12'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='nomMadre'> Nombre de la Madre</Label>
                                        <Controller
                                            id='nomMadre'
                                            name='nomMadre'
                                            defaultValue={objetoAuxEstudiantes !== undefined ? objetoAuxEstudiantes.nomMadre : 'Sin Datos'}
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} 
                                                    placeholder='(Obligatorio)' invalid={errors.nomMadre && true} />
                                            )}
                                        />
                                        {errors.nomMadre && <FormFeedback>{errors.nomMadre.message}</FormFeedback>}
                                    </div>
                                </Col>
                            
                            </Row>

                            <hr/>
                            <br/>
                            <div className='d-flex align-items-center justify-content-center'>
                                <Button className='me-1' color='primary' type='submit'>
                                    <Save size={15} />
                                    {" "}<span className='align-middle ml-25'>Guardar Cambios</span>
                                </Button>
                                <Button outline color='danger' type='reset' onClick={() => (setFormModalStateEditar(!formModalStateEditar))}>
                                    <X size={15} />
                                    {" "}<span className='align-middle ml-25'>Cancelar</span>
                                </Button>
                            </div>
                        </Form>
                    </ModalBody>  
                </CardBody>
            </Card>     
        </Modal>
    )
}

export default ComponenteModalEditarEstudiante