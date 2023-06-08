// ** React Imports
import { useContext, useState } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

import { Context } from '../../../../context/Context'

import Flatpickr from 'react-flatpickr'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'


// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

const defaultValues = {
  fechaIngreso: '',
  turnoDeInicio: ''
}

const opcionesCategorias = [
  { value: 'Día', label: 'Día (6 am -14 pm)' },
  { value: 'Tarde', label: 'Tarde (14 pm - 22 pm)' },
  { value: 'Noche', label: 'Noche (22 pm - 6 am)' }
]

const Address = ({ stepper }) => {

  const [picker, setPicker] = useState(new Date())

  const { setFechaIngreso, setTurnoDeInicio } = useContext(Context)

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    // if (Object.values(data).every(field => field.length > 0)) {
      stepper.next()
    //   setFechaIngreso(data.fechaIngreso)
    //   setTurnoDeInicio(data.turnoDeInicio)
    // } else {
    //   for (const key in data) {
    //     if (data[key].length === 0) {
    //       setError(key, {
    //         type: 'manual',
    //         message: `Por favor complete este campo`
    //       })
    //     }
    //   }
    // }
  }

  return (
    <>
      <div className='content-header'>
        <h5 className='mb-0'>Datos Laborales</h5>
        <small>Ingrese la fecha de ingreso y salida de la fuente laboral y el turno en el que se inició</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='fechaIngreso'>
              Fecha de Ingreso
            </Label>
            <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='fechaIngreso'>
              Fecha de Salida
            </Label>
            <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='default-picker' />
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='turnoDeInicio'>
              Turno de Inicio
            </Label>
            <Select
              isClearable={false}
              options={opcionesCategorias}
              // defaultValue={colourOptions[0]}
              placeholder='(Obligatorio)'
              classNamePrefix='select'
              theme={selectThemeColors}
              className={classnames('react-select', { 'is-invalid': errors.categoria && true})}
          />
          </Col>
        </Row>
       
        <br/><br/>
        <div className='d-flex justify-content-between'>
          <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Anterior</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Siguiente</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </>
  )
}

export default Address
