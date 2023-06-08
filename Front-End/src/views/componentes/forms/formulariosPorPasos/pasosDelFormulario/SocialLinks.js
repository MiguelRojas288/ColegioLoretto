// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { ArrowLeft } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

const defaultValues = {
  google: '',
  twitter: '',
  facebook: '',
  linkedin: ''
}

const SocialLinks = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      alert('submitted')
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key} url`
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Archivos adjutos al caso</h5>
        <small>Cargue archivos relacionados al caso, Ej. La papeleta de pago</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='twitter'>
              Seleccione el archivo
            </Label>
            <Controller
              id='twitter'
              name='twitter'
              control={control}
              render={({ field }) => (
                <Input invalid={errors.twitter && true} {...field} />
              )}
            />
            {errors.twitter && <FormFeedback>{errors.twitter.message}</FormFeedback>}
          </Col>
          
        </Row>
       
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Anterior</span>
          </Button>
          <Button type='submit' color='success' className='btn-submit'>
            Calcular Beneficios Sociales
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default SocialLinks
