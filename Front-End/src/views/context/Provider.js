import { useState } from "react"
import { Context } from "./Context"

export const Provider = ({ children }) => {

    // para la home de la app web
    const [dataSelectComunicados, setDataSelectComunicados] = useState([])

    // estado de multiple uso
    const [formModalStateNuevo, setFormModalStateNuevo] = useState(false)
    const [formModalStateDetalles, setFormModalStateDetalles] = useState(false)
    const [formModalStateEditar, setFormModalStateEditar] = useState(false)
    const [canvasAyuda, setCanvasAyuda] = useState(false)
    // const [objetoAux, setObjetoAux] = useState()

    // ventanas modales usuarios
    const [dataUsuarios, setDataUsuarios] = useState([])
    const [dataAuxiliarUsuarios, setDataAuxiliarUsuarios] = useState([])
    const [objetoAuxUsuarios, setObjetoAuxUsuarios] = useState()

    // estados del modulo estudiantes
    const [dataEstudiantes, setDataEstudiantes] = useState([])
    const [dataAuxiliarEstudiantes, setDataAuxiliarEstudiantes] = useState([])
    const [objetoAuxEstudiantes, setObjetoAuxEstudiantes] = useState()

    // estados del modulo estudiantes
    const [dataAtenciones, setDataAtenciones] = useState([])
    const [dataAuxiliarAtenciones, setDataAuxiliarAtenciones] = useState([])
    const [objetoAuxAtenciones, setObjetoAuxAtenciones] = useState()
        

    return (
        <Context.Provider value={
            { 

                // para la home de la app web
                dataSelectComunicados,
                setDataSelectComunicados,

                // globales
                formModalStateNuevo,
                setFormModalStateNuevo,
                formModalStateDetalles,
                setFormModalStateDetalles,
                formModalStateEditar,
                setFormModalStateEditar,
                canvasAyuda,
                setCanvasAyuda,

                // usuarios
                dataUsuarios,
                setDataUsuarios, 
                dataAuxiliarUsuarios,
                setDataAuxiliarUsuarios,
                objetoAuxUsuarios, 
                setObjetoAuxUsuarios,

                // estudiantes
                dataEstudiantes, 
                setDataEstudiantes, 
                dataAuxiliarEstudiantes,
                setDataAuxiliarEstudiantes,
                objetoAuxEstudiantes, 
                setObjetoAuxEstudiantes,

                // atenciones
                dataAtenciones, 
                setDataAtenciones, 
                dataAuxiliarAtenciones,
                setDataAuxiliarAtenciones,
                objetoAuxAtenciones, 
                setObjetoAuxAtenciones
            }
        }>
            { children }
        </Context.Provider>
    )
}