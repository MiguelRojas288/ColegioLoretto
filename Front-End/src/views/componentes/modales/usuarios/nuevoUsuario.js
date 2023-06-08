import { useContext, useState, useEffect } from 'react'
import { Modal, ModalBody, ModalHeader, Button, Form, Label, Input, FormFeedback, Card, CardBody, Row, Col } from 'reactstrap'
import { Save, RotateCw } from 'react-feather'
import InputPasswordToggle from "@components/input-password-toggle"

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

import avatar11 from '@src/assets/images/avatars/sin-foto.png'

// ** Utils
import { selectThemeColors } from '@utils'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'


const ComponenteModalNuevoUsuario = () => {

    const userToken = JSON.parse(sessionStorage.getItem('User'))
    const modulo = 'usuarios'

    const auxDatos = {
        auxEstado: 'Activo',
        auxFoto: 'linkDeLaFotoPreCargada'
    }

    const { formModalStateNuevo, setFormModalStateNuevo, setDataUsuarios } = useContext(Context)
    

    const SignupSchema = yup.object().shape({
        ci: yup.string().required('El C.I. es requerido').min(6, 'Mínimo 6 caracteres'),
        nombres: yup.string().required('Los nombres son requeridos').min(2, 'Mínimo 2 caracteres'),
        apellidos: yup.string().required('Los apellidos son requeridos').min(2, 'Mínimo 2 caracteres'),
        correo: yup.string().email('No es un correo válido').required('El correo es requerido'),
        rol: yup.object().required('El rol de usuario es requerido'),
        nombreDeUsuario: yup.string().required('El nombre de usuario es requerido').min(4, 'Mínimo 4 caracteres'),
        password: yup.string().required('La contraseña es requerida').min(6, 'Mínimo 6 caractéres').max(16, 'Máximo 16 caractéres'),
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
            nombres: '',
            apellidos: '',
            ci: '',
            correo: '',
            nombreDeUsuario: '',
            password: ''
        })
    }

    const llamarMetodoGet = async () => {
        const data = await metodoGet(modulo, userToken.token)
        setDataUsuarios(data.usuarios)
    }

    const llamarMetodoPost = async (datos) => {
        const res = await metodoPost(modulo, userToken.token, datos)
        if (res.ok === true) {
            ComponenteHandleSuccess()
            // se consulta la data de nuevo
            llamarMetodoGet()
        } else if (res.ok === false) {
            if (res.msg === 'Ya existe un registro con ese nombre de usuario') {
                ComponenteHandleWarning()
            } else {
                console.log(res)
                ComponenteHandleError()
            }
        }
    }
    
    const onSubmit = data => {
        
        const aux = {
            body: JSON.stringify({
                ci: data.ci,
                nombres: data.nombres,
                apellidos: data.apellidos,
                correo: data.correo,
                rol: data.rol.value,
                nombreDeUsuario: data.nombreDeUsuario,
                password: data.password,
                fotoDePerfil: auxDatos.auxFoto,
                estado: auxDatos.auxEstado
            })
        }

        llamarMetodoPost(aux)
        handleReset()
        setFormModalStateNuevo(!formModalStateNuevo)
    }

    const data = {
        avatar: avatar11,
        username: 'johndoe',
        fullName: 'John Doe',
        email: 'granger007@hogward.com',
        company: 'PIXINVENT'
    }


    // ** States
    const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')

    const onChange = e => {
        const reader = new FileReader(),
        files = e.target.files
        reader.onload = function () {
            setAvatar(reader.result)
        }
        reader.readAsDataURL(files[0])
    }


    const handleImgReset = () => {
        setAvatar(require('@src/assets/images/avatars/sin-foto.png').default)
    }

    const rolesDeUsuario = [
        { value : 'Director', label : 'Director' },
        { value : 'Profesional Psicólogo', label : 'Profesional Psicólogo' }
    ]

    useEffect(() => {

    }, [])
 

    return (
        <Modal isOpen={formModalStateNuevo} toggle={() => setFormModalStateNuevo(!formModalStateNuevo)} className='modal-dialog-centered' >
            <ModalHeader toggle={() => setFormModalStateNuevo(!formModalStateNuevo)} className='text-primary'>Nuevo Usuario</ModalHeader>
            <Card>
                <CardBody>
                    <ModalBody>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col xl='5' md='5' sm='12'>
                                    <Row>
                                        <Col xl='12' md='12' sm='12'>
                                            <img className='rounded-circle' src={avatar} alt='Generic placeholder image' height='150' width='150'/>
                                        </Col>
                                        <Col xl='12' md='12' sm='12'>
                                            <br/>
                                            <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                                                Cargar
                                                <Input type='file' onChange={onChange} hidden accept='image/*' />
                                            </Button>
                                            <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                                                Borrar
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xl='7' md='7' sm='12'>
                                    <Row>

                                        <Col xl='12' md='12' sm='12'>
                                            <br/>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='nombreDeUsuario'> Nombre de Usuario </Label>
                                                <Controller
                                                    id='nombreDeUsuario'
                                                    name='nombreDeUsuario'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} 
                                                            placeholder='(Obligatorio)' invalid={errors.nombreDeUsuario && true} />
                                                    )}
                                                />
                                                {errors.nombreDeUsuario && <FormFeedback>{errors.nombreDeUsuario.message}</FormFeedback>}
                                            </div>
                                        </Col>

                                        <Col xl='12' md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='password'> Contraseña </Label>
                                                <Controller
                                                    id='password'
                                                    name='password'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => (
                                                        <InputPasswordToggle
                                                            {...field}
                                                            className="input-group-merge"
                                                            placeholder='(Obligatorio)'
                                                            invalid={errors.password && true}
                                                        />
                                                    )}
                                                />
                                                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                                            </div>
                                        </Col>

                                    </Row>
                                </Col>

                                <Col xl='12' md='12' sm='12'>
                                    <Row>
                                        <Col xl='6' md='6' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='nombres'> Nombres </Label>
                                                <Controller
                                                    id='nombres'
                                                    name='nombres'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder='(Obligatorio)' invalid={errors.nombres && true} />
                                                    )}
                                                />
                                                {errors.nombres && <FormFeedback>{errors.nombres.message}</FormFeedback>}
                                            </div>
                                        </Col>

                                        <Col xl='6' md='6' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='apellidos'> Apellidos </Label>
                                                <Controller
                                                    id='apellidos'
                                                    name='apellidos'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder='(Obligatorio)' invalid={errors.apellidos && true} />
                                                    )}
                                                />
                                                {errors.apellidos && <FormFeedback>{errors.apellidos.message}</FormFeedback>}
                                            </div>
                                        </Col>

                                        <Col xl='7' md='7' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='rol'> Rol </Label>
                                                <Controller
                                                    id='react-select'
                                                    control={control}
                                                    name='rol'
                                                    render={({ field }) => (
                                                        <Select
                                                            isClearable={false}
                                                            options={rolesDeUsuario}
                                                            // defaultValue={colourOptions[0]}
                                                            placeholder='(Obligatorio)'
                                                            classNamePrefix='select'
                                                            theme={selectThemeColors}
                                                            className={classnames('react-select', { 'is-invalid': errors.rol && true})}
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                                {errors.rol && <FormFeedback>{errors.rol.message}</FormFeedback>}
                                            </div>
                                        </Col>

                                        <Col xl='5' md='5' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='ci'> C.I. </Label>
                                                <Controller
                                                    id='ci'
                                                    name='ci'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder='(Obligatorio)' invalid={errors.ci && true} />
                                                    )}
                                                />
                                                {errors.ci && <FormFeedback>{errors.ci.message}</FormFeedback>}
                                            </div>
                                        </Col>

                                        <Col xl='12' md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='correo'> Correo Electrónico </Label>
                                                <Controller
                                                    id='correo'
                                                    name='correo'
                                                    defaultValue=''
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input {...field} placeholder='(Obligatorio)' invalid={errors.correo && true} />
                                                    )}
                                                />
                                                {errors.correo && <FormFeedback>{errors.correo.message}</FormFeedback>}
                                            </div>
                                        </Col>

                                    </Row>
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

export default ComponenteModalNuevoUsuario