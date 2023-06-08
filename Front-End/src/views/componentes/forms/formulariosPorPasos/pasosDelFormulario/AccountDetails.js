// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight, UserPlus } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

import { Context } from '../../../../context/Context'

import metodoGet from '../../../../servicios/peticionesHTTP/get'

import ComponenteModalNuevoCliente from '../../../../componentes/modales/clientes/nuevoCliente'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useContext, useEffect } from 'react'


const AccountDetails = ({ stepper }) => {


  const { formModalStateNuevo, setFormModalStateNuevo, dataClientes, setDataClientes, setNombres, setApellidos, setCarnetIdentidad, setCelular, setIdPaciente } = useContext(Context)

  const userToken = JSON.parse(sessionStorage.getItem('User'))
  const modulo = 'clientes'

   // ** Hooks
   const {
    // control,
    setError,
    handleSubmit,
    // formState: { errors }
  } = useForm()

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      stepper.next()
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }


  const llamarMetodoGet = async () => {
    const data = await metodoGet(modulo, userToken.token)

    const datos = data.clientes
    datos.forEach(e => {
        e.value = (e.id)
        e.label = (`${e.nombres} ${e.apellidos} (C.I: ${e.carnetIdentidad})`)
    })
    setDataClientes(datos)
  }

  useEffect(() => {
    llamarMetodoGet()
  }, [])

  return (
    <>
      <div className='content-header'>
        <h5 className='mb-0'>Datos Personales</h5>
        <small>Selecciones los datos del cliente, o efectue un nuevo registro.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
         
        <Row>
          <Col xl='1' sm='1' md='1' className='mt-1'>
            <Button className='mt-50' block color='primary' outline onClick={() => setFormModalStateNuevo(!formModalStateNuevo)}>
                <UserPlus size={16} />
            </Button>
          </Col>
          <Col xl='6' sm='6' md='6  ' className='mb-1'>
            <Label className='form-label' for='country'>
              Cliente
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country`}
              className='react-select'
              classNamePrefix='select'
              options={dataClientes}
              onChange={data => (
                setNombres(data.nombres),
                setApellidos(data.apellidos),
                setCarnetIdentidad(data.carnetIdentidad),
                setCelular(data.celular),
                setIdPaciente(data.id)
            ) 
        }
              // defaultValue={countryOptions[0]}
            />
          </Col>
        </Row>

        <br/><br/>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Anterior</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Siguiente</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>

      <ComponenteModalNuevoCliente/>

    </>

  )
}

export default AccountDetails
