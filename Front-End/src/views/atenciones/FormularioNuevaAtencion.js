// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Pasos
import DatosBasicos from './pasosDelFormulario/DatosBasicos'
import Enfermeria from './pasosDelFormulario/Enfermeria'
import PreDiagnostico from './pasosDelFormulario/PreDiagnostico'
import PruebasProyectivas from './pasosDelFormulario/PruebasProyectivas'

const FormularioNuevaAtencion = () => {
  // Ref
  const ref = useRef(null)

  // De estado
  const [stepper, setStepper] = useState(null)

  const pasos = [
    {
      id: 'datos-basicos',
      title: 'Datos Básicos',
      subtitle: 'Esenciales para la atención',
      content: <DatosBasicos stepper={stepper}/>
    },
    {
      id: 'enfermeria',
      title: 'Enfermería',
      subtitle: 'Registre el paso por esta área',
      content: <Enfermeria stepper={stepper} />
    },
    {
      id: 'prediagnostico',
      title: 'Prediagnóstico',
      subtitle: 'Del Psicólogo',
      content: <PreDiagnostico stepper={stepper} />
    },
    {
      id: 'pruebas-proyectivas',
      title: 'Pruebas Proyectivas',
      subtitle: 'Definición de su uso',
      content: <PruebasProyectivas stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={pasos} />
    </div>
  )
}

export default FormularioNuevaAtencion
