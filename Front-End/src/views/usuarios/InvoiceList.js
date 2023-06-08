// ** React Imports
import { useEffect, useContext } from 'react'

import { useNavigate } from "react-router-dom"

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import metodoPut from '../servicios/peticionesHTTP/put'

import ComponenteHandleEdit from '../componentes/handle/handleEdit'
import ComponenteHandleWarning from '../componentes/handle/handleWarning'

import { Save, RotateCw } from 'react-feather'

// context
import { Context } from '../context/Context'

// ** Utils
import { selectThemeColors } from '@utils'
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'

// ** Reactstrap Imports
import { Button, Form, Label, Input, FormFeedback, Card, CardBody, Row, Col } from 'reactstrap'

const InvoiceList = () => {

  const navigate = useNavigate()

  const { objetoAuxUsuarios } = useContext(Context)

  const userToken = JSON.parse(sessionStorage.getItem('User'))
  const modulo = 'usuarios'

  const actualizar = () => {
    if (userToken.rol === 'Director') {
      navigate("/usuarios") 
    }
    navigate("/home") 
  }

  const SignupSchema = yup.object().shape({
    ci: yup.string().required('El C.I. es requerido').min(6, 'Mínimo 6 caracteres'),
    nombres: yup.string().required('Los nombres son requeridos').min(4, 'Mínimo 4 caracteres'),
    apellidos: yup.string().required('Los apellidos son requeridos').min(4, 'Mínimo 4 caracteres'),
    correo: yup.string().email('No es un correo válido').required('El correo es requerido'),
    nombreDeUsuario: yup.string().required('El nombre de usuario es requerido').min(4, 'Mínimo 4 caracteres'),
    // rol: yup.string().required('El rol de usuario es requerido').min(4, 'Mínimo 4 caracteres'),
  })

  const rolesDeUsuario = [
    { value : 'Director', label : 'Director' },
    { value : 'Profesional Psicólogo', label : 'Profesional Psicólogo' }
  ]

  // ** Hooks
  const {
      reset,
      control,
      handleSubmit,
      formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const handleReset = () => {
    reset({
      ci: objetoAuxUsuarios.ci,
      nombres: objetoAuxUsuarios.nombre,
      apellidos: objetoAuxUsuarios.apellidos,
      correo: objetoAuxUsuarios.correo,
      nombreDeUsuario: objetoAuxUsuarios.nombreDeUsuario
    })
  }

  const llamarMetodoPut = async (datos) => {
    const res = await metodoPut(modulo, userToken.token, objetoAuxUsuarios.id, datos)

    if (res.ok === true) {
        ComponenteHandleEdit()
        setTimeout(actualizar, 1000) 
    } else if (res.ok === false) {
        ComponenteHandleWarning()
    }
  }

  const onSubmit = data => {
        
    const aux = {
        body: JSON.stringify({
          ci: data.ci,
          nombres: data.nombres,
          apellidos: data.apellidos,
          correo: data.correo,
          rol: (data.rol !== undefined ? data.rol.value : objetoAuxUsuarios.rol),
          nombreDeUsuario: data.nombreDeUsuario,
          password: objetoAuxUsuarios.password,
          fotoDePerfil: objetoAuxUsuarios.fotoDePerfil,
          estado: objetoAuxUsuarios.estado  
        })
    }
    // console.log(aux)
    llamarMetodoPut(aux)
    // handleReset()
}

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>

              <Col xl='6' md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='nombres'> Nombres </Label>
                  <Controller
                      id='nombres'
                      name='nombres'
                      defaultValue={objetoAuxUsuarios !== undefined ? objetoAuxUsuarios.nombres : 'Sin Datos'}
                      control={control}
                      render={({ field }) => (
                          <Input {...field} 
                              placeholder='(Obligatorio)' invalid={errors.nombres && true} />
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
                      defaultValue={objetoAuxUsuarios !== undefined ? objetoAuxUsuarios.apellidos : 'Sin Datos'}
                      control={control}
                      render={({ field }) => (
                          <Input {...field} placeholder='(Obligatorio)' invalid={errors.apellidos && true} />
                      )}
                  />
                  {errors.apellidos && <FormFeedback>{errors.apellidos.message}</FormFeedback>}
                </div>
              </Col>

              <Col xl='4' md='4' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='ci'> Carnét de Identidad </Label>
                  <Controller
                      id='ci'
                      name='ci'
                      defaultValue={objetoAuxUsuarios !== undefined ? objetoAuxUsuarios.ci : 'Sin Datos'}
                      control={control}
                      render={({ field }) => (
                          <Input {...field} placeholder='(Obligatorio)' invalid={errors.ci && true} />
                      )}
                  />
                  {errors.ci && <FormFeedback>{errors.ci.message}</FormFeedback>}
                </div>
              </Col>

              <Col xl='8' md='8' sm='12'>
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
                                placeholder={objetoAuxUsuarios !== undefined ? objetoAuxUsuarios.rol : 'Sin Datos'}
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

              <Col xl='4' md='4' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='nombreDeUsuario'> Nombre de Usuario </Label>
                  <Controller
                      id='nombreDeUsuario'
                      name='nombreDeUsuario'
                      defaultValue={objetoAuxUsuarios !== undefined ? objetoAuxUsuarios.nombreDeUsuario : 'Sin Datos'}
                      control={control}
                      render={({ field }) => (
                          <Input {...field} placeholder='(Obligatorio)' invalid={errors.nombreDeUsuario && true} />
                      )}
                  />
                  {errors.nombreDeUsuario && <FormFeedback>{errors.nombreDeUsuario.message}</FormFeedback>}
                </div>
              </Col>

              <Col xl='8' md='8' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='correo'> Correo </Label>
                  <Controller
                      id='correo'
                      name='correo'
                      defaultValue={objetoAuxUsuarios !== undefined ? objetoAuxUsuarios.correo : 'Sin Datos'}
                      control={control}
                      render={({ field }) => (
                          <Input {...field} placeholder='(Obligatorio)' invalid={errors.correo && true} />
                      )}
                  />
                  {errors.correo && <FormFeedback>{errors.correo.message}</FormFeedback>}
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
        </CardBody>
      </Card>
    </div>
  )
}

export default InvoiceList
