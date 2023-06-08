// react, reacstrap  y react father
import { useEffect, useContext, useState } from 'react'
import { InputGroup, InputGroupText, Input, Row, Col, Button, Card, CardBody, UncontrolledTooltip, Label } from 'reactstrap'
import { Flag, Plus, Search, Edit2, Trash2, Eye, Edit, DollarSign } from 'react-feather'
// import classnames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

// metodos
import metodoGet from '../servicios/peticionesHTTP/get'

// context
import { Context } from '../context/Context'

// variables
import { columns } from './columns'

// componentes
import ComponenteBreadcump from '../componentes/breadcump'
import ComponenteDataTable from '../componentes/datatable'
import ComponenteModalNuevoEstudiante from '../componentes/modales/estudiantes/nuevoEstudiante'
import ComponenteModalEditarEstudiante from '../componentes/modales/estudiantes/editarEstudiante'
import ComponenteModalDetallesEstudiante from '../componentes/modales/estudiantes/detallesEstudiante'
import ComponenteHandleDelete from '../componentes/handle/handleDelete'

// Estilos del DataTable
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import ComponenteOffCanvasAyuda from '../componentes/canvas/offCanvas'

// import Prism from 'prismjs'


const Estudiantes = () => {

//-------------------------------------------------- VARIABLES Y ESTADOS --------------------------------------------------------------

    const navigate = useNavigate()

    const userToken = JSON.parse(sessionStorage.getItem('User'))
    const modulo = 'estudiantes'

    const { 
        // formularios
        formModalStateNuevo, 
        setFormModalStateNuevo, 
        formModalStateDetalles,
        setFormModalStateDetalles,
        formModalStateEditar,
        setFormModalStateEditar,
        canvasAyuda, 
        setCanvasAyuda,
        // variable auxiliar
        setObjetoAuxEstudiantes,
        // data estudiantes
        dataEstudiantes,
        setDataEstudiantes, 
        dataAuxiliarEstudiantes,
        setDataAuxiliarEstudiantes
    } = useContext(Context)


    const llamarMetodoGet = async () => {
        const data = await metodoGet(modulo, userToken.token)
        setDataEstudiantes(data.estudiantes)
        setDataAuxiliarEstudiantes(data.estudiantes)
    }

    const llamarHandleDelete = async (id) => {
        await ComponenteHandleDelete(modulo, userToken, id)
        setTimeout(llamarMetodoGet, 200)
    }

    const toggleCanvasBottom = () => {
        setCanvasAyuda(!canvasAyuda)
    }

    // Funcion de filtrado por barra de busqueda
    const filtrarSegunParametros = e => {
        const a = (e.target.value)
        const filtradito = dataAuxiliarEstudiantes.filter(item => {
        if (item.nombre.toLowerCase().includes(a.toLowerCase()) || item.curso.toLowerCase().includes(a.toLowerCase()) || item.sexo.toLowerCase().includes(a.toLowerCase()) || item.nomPadre.toLowerCase().includes(a.toLowerCase()) || item.nomMadre.toLowerCase().includes(a.toLowerCase()) || item.edad.toString().includes(a)) {
            return item
        }
        })
        setDataEstudiantes(filtradito)
    }

    const acciones = [
        {
            name: 'Acciones',
            minWidth: '100px',
            sortable: true,
            cell: row => (
                <div className='column-action d-flex align-items-center'>

                    <Link
                        className='d-flex align-items-center justify-content-between p-0'
                        id={`send-tooltip-1-${row.id}`}
                        onClick={() => (
                            setObjetoAuxEstudiantes(
                                {
                                    id: row.id,
                                    nombre: row.nombre,
                                    curso: row.curso,
                                    edad: row.edad,
                                    sexo: row.sexo,
                                    nomPadre: row.nomPadre, 
                                    nomMadre: row.nomMadre 
                                }
                            ),
                            setFormModalStateDetalles(!formModalStateDetalles)
                        )}
                    >
                        <Eye size={17}/>
                    </Link>
                    <UncontrolledTooltip placement='top' target={`send-tooltip-1-${row.id}`}>
                        Ver Detalles
                    </UncontrolledTooltip>
                    
                    <Link
                        className='d-flex align-items-center justify-content-between p-0'
                        id={`send-tooltip-3-${row.id}`}
                        onClick={() => (
                            setObjetoAuxEstudiantes(
                                {
                                    id: row.id,
                                    nombre: row.nombre,
                                    curso: row.curso,
                                    edad: row.edad,
                                    sexo: row.sexo,
                                    nomPadre: row.nomPadre, 
                                    nomMadre: row.nomMadre 
                                }
                            ),
                            setFormModalStateEditar(!formModalStateEditar)
                        )}
                    >
                        <Edit size={17} className='mx-1'/>
                    </Link>
                    <UncontrolledTooltip placement='top' target={`send-tooltip-3-${row.id}`}>
                        Editar
                    </UncontrolledTooltip>

                    <Trash2 className='cursor-pointer' size={17} id={`send-tooltip-4-${row.id}`} onClick={() => llamarHandleDelete(row.id)}/>
                    <UncontrolledTooltip placement='top' target={`send-tooltip-4-${row.id}`}>
                        Eliminar
                    </UncontrolledTooltip>

                </div>
            )
        }
    ]

//------------------------------------------------------ FUNCIONES --------------------------------------------------------------


//---------------------------------------------------- DE INTERACCION --------------------------------------------------------------


//---------------------------------------------------- FUNCIONES PRINCIPALES --------------------------------------------------------------


    useEffect(() => {
        llamarMetodoGet()
    }, [])


//----------------------------------------------------VISUAL / COMPONENTES--------------------------------------------------------------

    return (
        <>
            <ComponenteBreadcump titulo={'Estudiantes'}/>
        
            <Card>
                <CardBody>
                    <Row>

                        <Col xl='6' md='6' sm='3'>
                            <Button color='primary' className='round' outline onClick={toggleCanvasBottom}>
                                <Flag size={14} />
                                <span className='align-middle ml-25'> Ayuda</span>
                            </Button>
                        </Col>
                        <Col xl='3' md='3' sm='4'>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <InputGroup className='input-group-merge mr-1'>
                                    <InputGroupText>
                                        <Search size={14} />
                                    </InputGroupText>
                                    <Input 
                                        placeholder='Buscar...' 
                                        id='search-invoice'
                                        type='text'
                                        onChange={filtrarSegunParametros}
                                    />
                                </InputGroup>
                            </div>
                        </Col>
                        <Col xl='3' md='3' sm='5'>
                            <Button color='primary' block className='round' onClick={() => setFormModalStateNuevo(!formModalStateNuevo)}>
                                <Plus size={14} />
                                <span className='align-middle ml-25'> Nuevo Estudiante</span>
                            </Button>
                        </Col>

                    </Row> 
                </CardBody>
            </Card>

            <Card>
                {/* <ComponenteDataTable columnas={userToken.rol !== 'Administrador' ? columns : columns.concat(acciones)} datos={dataEstudiantes}/> */}
                <ComponenteDataTable columnas={columns.concat(acciones)} datos={dataEstudiantes}/>
            </Card>
            
            <Card>
                <ComponenteOffCanvasAyuda />
            </Card>


{/* ---------------------------------------------------- VISUAL / COMPONENTES -------------------------------------------------------------- */}

            <ComponenteModalNuevoEstudiante/>
            <ComponenteModalDetallesEstudiante/>
            <ComponenteModalEditarEstudiante/>
        </>
    )
}

export default Estudiantes