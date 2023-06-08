// ** Third Party Components
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'

import { ArrowLeft, ArrowRight, Plus } from 'react-feather'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

import moment from 'moment'

// context
import { Context } from '../../context/Context'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useEffect, useContext } from 'react'

const DatosBasicos = ({ stepper }) => {

  const fecha = (moment().format())

  const userToken = JSON.parse(sessionStorage.getItem('User'))

  const { dataEstudiantes, setObjetoAuxAtenciones } = useContext(Context)

  const SignupSchema = yup.object().shape({
    idEstudiante: yup.object().required('El estudiante es requerido'),
    motivoDeAtencion: yup.string().required('El motivo de la atención es requerido').min(2, 'Mínimo 2 caracteres'),
  })

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = (data) => {
    
    setObjetoAuxAtenciones(
      {        
        fechaYHora: fecha,
        idUsuarioEncargado: userToken.uid,
        pasoPorEnfermeria: 'vacio',
        diagnosticoDeEnfermeria: 'vacio',
        motivoDeAtencion: data.motivoDeAtencion, 
        idEstudiante: data.idEstudiante.value,
        preDiagnostico: 'vacio',
        recomendaciones: 'vacio',
        observaciones: 'vacio',
        usoDePruProy: 'vacio'
      }
    )

    stepper.next()

  }

  useEffect(() => {
  }, [])

  return (
    <>
      <div className='content-header'>
        <h5 className='mb-0'>Datos Básicos de la Atención</h5>
        <small>Ingrese los datos esenciales relacionados al caso en atención (del estudiante y motivo de ingreso al área de Psicología).</small>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>

          <Col xl='3' md='3' sm='12'>
            <div className='mb-1'>
              <Label className='form-label' for='fechaYHOra'> Fecha y Hora</Label>
              <Input value={moment(fecha).format('DD-MM-YYYY - hh:mm a')} disabled/>
            </div>
          </Col>

          <Col xl='3' md='3' sm='12'>
            <div className='mb-1'>
              <Label className='form-label' for='idUsuarioEncargado'> Psicólogo Encargado</Label>
              <Input value={userToken.nombre} disabled/>
            </div>
          </Col>

          <Col xl='5' md='5' sm='10'>
            <div className='mb-1'>
              <Label className='form-label' for='idEstudiante'> Estudiante </Label>
              <Controller
                id='react-select'
                control={control}
                name='idEstudiante'
                render={({ field }) => (
                  <Select
                    isClearable={false}
                    options={dataEstudiantes}
                    // defaultValue={colourOptions[0]}
                    placeholder='(Obligatorio)'
                    classNamePrefix='select'
                    theme={selectThemeColors}
                    className={classnames('react-select', { 'is-invalid': errors.idEstudiante && true})}
                    {...field}
                  />
                )}
              />
              {errors.idEstudiante && <FormFeedback>{errors.idEstudiante.message}</FormFeedback>}
            </div>
          </Col>

          <Col xl='1' md='1' sm='2'>
              <br/>
              <Button type='button' color='primary' className='btn-prev round' outline>
                <Plus size={14}></Plus>
              </Button>
          </Col>

          <Col xl='12' md='12' sm='12'>
            <div className='mb-1'>
              <Label className='form-label' for='motivoDeAtencion'> Motivo del Ingreso al Área de Psicología</Label>
              <Controller
                id='motivoDeAtencion'
                name='motivoDeAtencion'
                defaultValue=''
                control={control}
                render={({ field }) => (
                  <Input {...field} 
                    placeholder='(Obligatorio)' type='textarea' rows='4' invalid={errors.motivoDeAtencion && true} />
                )}
              />
              {errors.motivoDeAtencion && <FormFeedback>{errors.motivoDeAtencion.message}</FormFeedback>}
            </div>
          </Col>

        </Row>

        <div className='d-flex justify-content-between'>
          <Button type='button' color='secondary' className='btn-prev' outline disabled>
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

export default DatosBasicos

























// // ** Third Party Components
// import Select from 'react-select'
// import { useForm, Controller } from 'react-hook-form'
// import { ArrowLeft, ArrowRight } from 'react-feather'

// // ** Utils
// import { selectThemeColors } from '@utils'

// // ** Reactstrap Imports
// import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

// // ** Styles
// import '@styles/react/libs/react-select/_react-select.scss'

// const defaultValues = {
//   fechaYHora: '',
//   idUsuarioEncargado: '',
//   // idEstudiante: '',
//   motivoDeAtencion:''
// }

// const DatosBasicos = ({ stepper }) => {
//   // ** Hooks
//   const {
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({ defaultValues })

//   const onSubmit = data => {
//     if (Object.values(data).every(field => field.length > 0)) {
//       stepper.next()
//     } else {
//       for (const key in data) {
//         if (data[key].length === 0) {
//           setError(key, {
//             type: 'manual',
//             message: 'Este campo es requerido'
//           })
//         }
//       }
//     }
//   }

//   const countryOptions = [
//     { value: 'UK', label: 'UK' },
//     { value: 'USA', label: 'USA' },
//     { value: 'Spain', label: 'Spain' },
//     { value: 'France', label: 'France' },
//     { value: 'Italy', label: 'Italy' },
//     { value: 'Australia', label: 'Australia' }
//   ]

//   return (
//     <>
//       <div className='content-header'>
//         <h5 className='mb-0'>Datos Básicos de la Atención</h5>
//         <small>Ingrese los datos esenciales relacionados al caso en atención (del estudiante y motivo de ingreso al área de Psicología).</small>
//       </div>

//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Row>

//           <Col xl='3' md='3' sm='12' className='mb-1'>
//             <Label className='form-label' for='fechaYHora'>Fecha y Hora</Label>
//             <Controller
//               id='fechaYHora'
//               name='fechaYHora'
//               control={control}
//               render={({ field }) => <Input placeholder='John' invalid={errors.fechaYHora && true} {...field} />}
//             />
//             {errors.fechaYHora && <FormFeedback>{errors.fechaYHora.message}</FormFeedback>}
//           </Col>

//           <Col xl='3' md='3' sm='12' className='mb-1'>
//             <Label className='form-label' for='idUsuarioEncargado'>
//               Psicólogo Encargado
//             </Label>
//             <Controller
//               id='idUsuarioEncargado'
//               name='idUsuarioEncargado'
//               control={control}
//               render={({ field }) => <Input placeholder='Doe' invalid={errors.idUsuarioEncargado && true} {...field} />}
//             />
//             {errors.idUsuarioEncargado && <FormFeedback>{errors.idUsuarioEncargado.message}</FormFeedback>}
//           </Col>

//           <Col xl='5' md='5' sm='12' className='mb-1'>
//             <Label className='form-label' for='idEstudiante'>
//               Estudiante
//             </Label>
//             <Select
//               theme={selectThemeColors}
//               isClearable={false}
//               id={`idEstudiante`}
//               className='react-select'
//               classNamePrefix='select'
//               options={countryOptions}
//               defaultValue={countryOptions[0]}
//             />
//           </Col>

//           <Col xl='12' md='12' sm='12' className='mb-1'>
//             <Label className='form-label' for='motivoDeAtencion'>
//               Motivo del Ingreso al Área de Psicología
//             </Label>
//             <Controller
//               id='motivoDeAtencion'
//               name='motivoDeAtencion'
//               control={control}
//               render={({ field }) => <Input placeholder='Doe' type='textarea' rows='4' invalid={errors.motivoDeAtencion && true} {...field} />}
//             />
//             {errors.motivoDeAtencion && <FormFeedback>{errors.motivoDeAtencion.message}</FormFeedback>}
//           </Col>

//         </Row>

//         <div className='d-flex justify-content-between'>
//           <Button type='button' color='secondary' className='btn-prev' outline disabled>
//             <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
//             <span className='align-middle d-sm-inline-block d-none'>Anterior</span>
//           </Button>
//           <Button type='submit' color='primary' className='btn-next'>
//             <span className='align-middle d-sm-inline-block d-none'>Siguiente</span>
//             <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
//           </Button>
//         </div>
//       </Form>
//     </>
//   )
// }

// export default DatosBasicos