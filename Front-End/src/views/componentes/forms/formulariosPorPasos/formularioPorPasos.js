// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Address from './pasosDelFormulario/Address'
import SocialLinks from './pasosDelFormulario/SocialLinks'
import PersonalInfo from './pasosDelFormulario/PersonalInfo'
import AccountDetails from './pasosDelFormulario/AccountDetails'

const ComponenteFormPorPasos = () => {
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'datosPersonales',
      title: 'Datos Personales',
      subtitle: 'Nombres, Apellidos y C.I.',
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'datosSalariales',
      title: 'Datos Salariales',
      subtitle: 'Haber Básico (Último Salario)',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'datosLaborales',
      title: 'Datos Laborales',
      subtitle: 'Fecha de Ingreso y Turno',
      content: <Address stepper={stepper} />
    },
    {
      id: 'archivos',
      title: 'Archivos',
      subtitle: 'Ej. Papeleta de Pago',
      content: <SocialLinks stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default ComponenteFormPorPasos
