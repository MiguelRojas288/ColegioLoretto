// ** React Imports
import { Fragment } from 'react'

import { useContext } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

import { Context } from '../../../../context/Context'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
  haberBasico: ''
}

const PersonalInfo = ({ stepper }) => {

  const { setHaberBasico } = useContext(Context)

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      stepper.next()
      setHaberBasico(data.haberBasico)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Por favor complete este campo`
          })
        }
      }
    }
  }


  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Datos Salariales</h5>
        <small>Ingrese su haber básico (Monto del último salario percibido)</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='haberBasico'>
              Monto del Último Salario
            </Label>
            <Controller
              id='haberBasico'
              name='haberBasico'
              control={control}
              render={({ field }) => <Input type='number' placeholder='Bs.' invalid={errors.haberBasico && true} {...field} />}
            />
            {errors.haberBasico && <FormFeedback>{errors.haberBasico.message}</FormFeedback>}
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
    </Fragment>
  )
}

export default PersonalInfo
