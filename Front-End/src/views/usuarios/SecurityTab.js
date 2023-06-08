// ** React Imports
import { Fragment, useContext } from 'react'

import { useNavigate } from "react-router-dom"

// const bcrypt = require('bcryptjs')
import bcrypt from 'bcryptjs'

import metodoPut from '../servicios/peticionesHTTP/put'

// context
import { Context } from '../context/Context'

import ComponenteHandleEditContra from '../componentes/handle/handleEditContra'
import ComponenteHandleError from '../componentes/handle/handleError'


// ** Reactstrap Imports
import { Row, Col, Card, Form, Alert, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Third Party Components
import * as yup from 'yup'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import logo2 from '@src/assets/images/icons/social/google.png'

const SignupSchema = yup.object().shape({
  password: yup.string().min(6, 'Minimo 6 caracteres').required(),
  confirmPassword: yup
    .string()
    .min(6, 'Minimo 6 caracteres')
    .oneOf([yup.ref('password'), null], 'La contraseña no coincide')
})


const connectedAccounts = [
  {
    checked: true,
    title: 'Google',
    subtitle: 'Correo electrónico gmail',
    logo: logo2
  }
]

const defaultValues = {
  password: '',
  confirmPassword: ''
}

const SecurityTab = () => {

  const navigate = useNavigate()

  const userToken = JSON.parse(sessionStorage.getItem('User'))
  const modulo = 'usuarios'

  const { objetoAuxUsuarios } = useContext(Context)
  // ** Hooks

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) })


  const llamarMetodoPut = async (datos) => {
    const res = await metodoPut(modulo, userToken.token, objetoAuxUsuarios.id, datos)

    if (res.ok === true) {
      ComponenteHandleEditContra()
      /setTimeout(actualizar, 1500) 
    } else if (res.ok === false) {
      ComponenteHandleError()
    }
  }

  const actualizar = () => {
    if (userToken.rol === 'Director') {
      navigate("/usuarios") 
    }
    navigate("/home") 
  }

  const onSubmit = data => {
    trigger()
    // encriptar contraseña
    const salt = bcrypt.genSaltSync()
    // usuario.password = bcrypt.hashSync(password, salt)
    const encriptado = bcrypt.hashSync(data.password, salt)

    const aux = {
      body: JSON.stringify({
        ci: objetoAuxUsuarios.ci,
        nombres: objetoAuxUsuarios.nombres,
        apellidos: objetoAuxUsuarios.apellidos,
        correo: objetoAuxUsuarios.correo,
        rol: objetoAuxUsuarios.rol,
        nombreDeUsuario: objetoAuxUsuarios.nombreDeUsuario,
        password: encriptado,
        fotoDePerfil: objetoAuxUsuarios.fotoDePerfil,
        estado: objetoAuxUsuarios.estado  
      })
  }
  // console.log(aux)
  llamarMetodoPut(aux)

  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Cambiar Contraseña</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Alert color='warning' className='mb-2'>
              <div className='alert-body'>La nueva contraseña debe tener minimo 6 caracteres y máximo 16</div>
            </Alert>
            <Row>
              <Col className='mb-2' md={6}>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Nueva Contraseña'
                      htmlFor='password'
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password && <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>}
              </Col>
              <Col className='mb-2' md={6}>
                <Controller
                  control={control}
                  id='confirmPassword'
                  name='confirmPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Confirmar Nueva Contraseña'
                      htmlFor='confirmPassword'
                      className='input-group-merge'
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback className='d-block'>{errors.confirmPassword.message}</FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <Button type='submit' color='primary'>
                  Cambiar Contraseña
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle className='mb-75'>Medios de Recuperación</CardTitle>
          <p>Recuerde que puede recuperar su contraseña mediante su correo electrónico de google.</p>
          {connectedAccounts.map((item, index) => {
            return (
              <div key={index} className='d-flex mt-2'>
                <div className='flex-shrink-0'>
                  <img className='me-1' src={item.logo} alt={item.title} height='38' width='38' />
                </div>
                <div className='d-flex align-item-center justify-content-between flex-grow-1'>
                  <div className='me-1'>
                    <p className='fw-bolder mb-0'>{item.title}</p>
                    <span>{item.subtitle}</span>
                  </div>

                </div>
              </div>
            )
          })}
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default SecurityTab
