import { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader, Button, Form, Label, Input, FormFeedback, Card, CardBody, Row, Col } from 'reactstrap'
import { Save, RotateCw, } from 'react-feather'

// context
import { Context } from '../../../context/Context'

// metodos
import metodoPost from '../../../servicios/peticionesHTTP/post'
import metodoGet from '../../../servicios/peticionesHTTP/get'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import ComponenteHandleError from '../../../componentes/handle/handleError'
import ComponenteHandleSuccess from '../../../componentes/handle/handleSuccess'
import ComponenteHandleWarning from '../../../componentes/handle/handleWarning'

// ** Utils
import { selectThemeColors } from '@utils'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'

const ComponenteModalNuevoEstudiante = () => {

    const userToken = JSON.parse(sessionStorage.getItem('User'))
    const modulo = 'estudiantes'

    const [sexo, setSexo] = useState('Sin Especificar')

    const varAux = {
        sexo
    }

    const cursos = [
        { value : '5ºA - Primaria', label : '5ºA - Primaria' },
        { value : '5ºB - Primaria', label : '5ºB - Primaria' },
        { value : '6ºA - Primaria', label : '6ºA - Primaria' },
        { value : '6ºB - Primaria', label : '6ºB - Primaria' }
    ]

    const { formModalStateNuevo, setFormModalStateNuevo, setDataEstudiantes, setDataAuxiliarEstudiantes } = useContext(Context)

    const SignupSchema = yup.object().shape({
        nombre: yup.string().required('El nombre es requerido').min(2, 'Mínimo 2 caracteres'),
        curso: yup.object().required('El curso es requerido'),
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


    const handleReset = () => {
        reset({
            nombre: '',
            edad: '',
            nomPadre: '',
            nomMadre: ''
        })
        setSexo('Sin Especificar')
    }


    const llamarMetodoGet = async () => {
        const data = await metodoGet(modulo, userToken.token)
        setDataEstudiantes(data.estudiantes)
        setDataAuxiliarEstudiantes(data.estudiantes)
    }

    const llamarMetodoPost = async (datos) => {
        const res = await metodoPost(modulo, userToken.token, datos)

        if (res.ok === true) {
            ComponenteHandleSuccess()
            // se consulta la data de nuevo
            llamarMetodoGet()
        } else if (res.ok === false) {
            console.log(res)
            ComponenteHandleError()
        }
    }
    
    const onSubmit = async (data) => {

        // if (data.celular === undefined || data.celular === '') {
        //     data.celular = '0'
        // }
        
        const aux = {
            body: JSON.stringify({             
                nombre: data.nombre,
                curso: data.curso.value, 
                edad: data.edad,
                sexo: varAux.sexo,
                nomPadre: data.nomPadre,
                nomMadre: data.nomMadre
            })
        }

        // console.log(aux)
        llamarMetodoPost(aux)
        handleReset()
        setFormModalStateNuevo(!formModalStateNuevo)
    }

    return (
        <Modal isOpen={formModalStateNuevo} toggle={() => setFormModalStateNuevo(!formModalStateNuevo)} className='modal-dialog-centered' >
            <ModalHeader toggle={() => setFormModalStateNuevo(!formModalStateNuevo)} className='text-primary'>Nuevo Estudiante</ModalHeader>
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
                                            defaultValue=''
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
                                                    placeholder='(Obligatorio)'
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
                                            defaultValue=''
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
                                            defaultValue=''
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
                                            defaultValue=''
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} 
                                                    placeholder='(Obligatorio)' invalid={errors.nomMadre && true} />
                                            )}
                                        />
                                        {errors.nomMadre && <FormFeedback>{errors.nomMadre.message}</FormFeedback>}
                                    </div>
                                </Col>

                                <Col xl='12' md='12' sm='12'>
                                    <div className='d-flex align-items-center justify-content-center mb-2' >
                                        <div className='demo-inline-spacing'>
                                            <div className='form-check'>
                                                <Input type='radio' name='ex1' id='ex1-inactive' onChange={() => setSexo('Masculino')}/>
                                                <Label className='form-check-label' for='ex1-inactive'>
                                                    Masculino
                                                </Label>
                                            </div>
                                            <div className='form-check'>
                                                <Input type='radio' name='ex1' id='ex2-inactive' onChange={() => setSexo('Femenino')}/>

                                                <Label className='form-check-label' for='ex2-inactive'>
                                                    Femenino
                                                </Label>
                                            </div>
                                            <div className='form-check'>
                                                <Input type='radio' id='ex3-active' name='ex1' defaultChecked onChange={() => setSexo('Sin Especificar')}/>
                                                <Label className='form-check-label' for='ex3-active'>
                                                    Sin Especificar
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                            </Row>

                            <hr/>
                            <br/>
                            <div className='d-flex align-items-center justify-content-center'>
                                <Button className='me-1' color='primary' type='submit'>
                                    <Save size={15} />
                                    {" "}<span className='align-middle ml-25'>Guardar Registro</span>
                                </Button>
                                <Button outline color='secondary' type='reset' onClick={handleReset}>
                                    <RotateCw size={15} />
                                    {" "}<span className='align-middle ml-25'>Restablecer</span>
                                </Button>
                            </div>
                        </Form>
                    </ModalBody>  
                </CardBody>
            </Card>     
        </Modal>
    )
}

export default ComponenteModalNuevoEstudiante