// react, reacstrap  y react father
import { useEffect, useContext } from 'react'
import { Card } from 'reactstrap'

// metodos
import metodoGet from '../servicios/peticionesHTTP/get'

// context
import { Context } from '../context/Context'

// componentes
import ComponenteBreadcump from '../componentes/breadcump'
import FormularioNuevaAtencion from './FormularioNuevaAtencion'

// Estilos del DataTable
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


const NuevaAtencion = () => {

//-------------------------------------------------- VARIABLES Y ESTADOS --------------------------------------------------------------

    const userToken = JSON.parse(sessionStorage.getItem('User'))

    const { setDataEstudiantes } = useContext(Context)


    const llamarMetodoGetEstudiantes = async () => {
        const data = await metodoGet('estudiantes', userToken.token)

        const datos = data.estudiantes
        datos.forEach(e => {
            e.value = (e.id)
            e.label = (e.nombre)
        })
        setDataEstudiantes(datos)
    }

//------------------------------------------------------ FUNCIONES --------------------------------------------------------------


//---------------------------------------------------- DE INTERACCION --------------------------------------------------------------


//---------------------------------------------------- FUNCIONES PRINCIPALES --------------------------------------------------------------


    useEffect(() => {
        llamarMetodoGetEstudiantes()
    }, [])


//----------------------------------------------------VISUAL / COMPONENTES--------------------------------------------------------------

    return (
        <>
            <ComponenteBreadcump titulo={'Atenciones'} titulo2={'Nueva Atención'} link={'/atenciones'}/>
        
            <Card>
                <FormularioNuevaAtencion/>
            </Card>

{/* ---------------------------------------------------- VISUAL / COMPONENTES -------------------------------------------------------------- */}

        </>
    )
}

export default NuevaAtencion