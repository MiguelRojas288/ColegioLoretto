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
import ComponenteHandleDelete from '../componentes/handle/handleDelete'

// Estilos del DataTable
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import ComponenteOffCanvasAyuda from '../componentes/canvas/offCanvas'

// import Prism from 'prismjs'


const Atenciones = () => {

//-------------------------------------------------- VARIABLES Y ESTADOS --------------------------------------------------------------

    const navigate = useNavigate()

    const userToken = JSON.parse(sessionStorage.getItem('User'))
    const modulo = 'atenciones'

    const { 
        // formularios
        canvasAyuda, 
        setCanvasAyuda,
        // variable auxiliar
        setObjetoAuxAtenciones,
        // data estudiantes
        dataAtenciones,
        setDataAtenciones, 
        dataAuxiliarAtenciones,
        setDataAuxiliarAtenciones
    } = useContext(Context)


    const llamarMetodoGet = async () => {
        const data = await metodoGet(modulo, userToken.token)
        setDataAtenciones(data.atenciones)
        setDataAuxiliarAtenciones(data.atenciones)
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
        const filtradito = dataAuxiliarAtenciones.filter(item => {
        if (item.nombre.toLowerCase().includes(a.toLowerCase()) || item.sexo.toLowerCase().includes(a.toLowerCase()) || item.nomPadre.toLowerCase().includes(a.toLowerCase()) || item.nomMadre.toLowerCase().includes(a.toLowerCase()) || item.edad.toString().includes(a)) {
            return item
        }
        })
        setDataAtenciones(filtradito)
    }

    const acciones = [
        {
            name: 'Acciones',
            minWidth: '100px',
            sortable: true,
            cell: row => (
                <div className='column-action d-flex align-items-center'>

                    <Link
                        to='/detallesAtencion'
                        className='d-flex align-items-center justify-content-between p-0'
                        id={`send-tooltip-1-${row.id}`}
                        onClick={() => (
                            setObjetoAuxAtenciones(
                                {
                                    id: row.id,
                                    fechaYHora: row.fechaYHora,
                                    idUsuarioEncargado: row.idUsuarioEncargado,
                                    pasoPorEnfermeria: row.pasoPorEnfermeria,
                                    diagnosticoDeEnfermeria: row.diagnosticoDeEnfermeria,
                                    motivoDeAtencion: row.motivoDeAtencion, 
                                    idEstudiante: row.idEstudiante,
                                    preDiagnostico: row.preDiagnostico,
                                    recomendaciones: row.recomendaciones,
                                    observaciones: row.observaciones,
                                    usoDePruProy: row.usoDePruProy
                                }
                            )
                        )}
                    >
                        <Eye size={17}/>
                    </Link>
                    <UncontrolledTooltip placement='top' target={`send-tooltip-1-${row.id}`}>
                        Ver Detalles
                    </UncontrolledTooltip>
                    
                    <Link
                        to='/editarAtencion'
                        className='d-flex align-items-center justify-content-between p-0'
                        id={`send-tooltip-3-${row.id}`}
                        onClick={() => (
                            setObjetoAuxAtenciones(
                                {
                                    id: row.id,
                                    fechaYHora: row.fechaYHora,
                                    idUsuarioEncargado: row.idUsuarioEncargado,
                                    pasoPorEnfermeria: row.pasoPorEnfermeria,
                                    diagnosticoDeEnfermeria: row.diagnosticoDeEnfermeria,
                                    motivoDeAtencion: row.motivoDeAtencion, 
                                    idEstudiante: row.idEstudiante,
                                    preDiagnostico: row.preDiagnostico,
                                    recomendaciones: row.recomendaciones,
                                    observaciones: row.observaciones,
                                    usoDePruProy: row.usoDePruProy
                                }
                            )
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
            <ComponenteBreadcump titulo={'Atenciones'}/>
        
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
                            <Button color='primary' block className='round' onClick={() => navigate("/nuevaAtencion")}>
                                <Plus size={14} />
                                <span className='align-middle ml-25'> Nueva Atención</span>
                            </Button>
                        </Col>

                    </Row> 
                </CardBody>
            </Card>

            <Card>
                <ComponenteDataTable columnas={columns.concat(acciones)} datos={dataAtenciones}/>
            </Card>
            
            <Card>
                <ComponenteOffCanvasAyuda />
            </Card>


{/* ---------------------------------------------------- VISUAL / COMPONENTES -------------------------------------------------------------- */}

        </>
    )
}

export default Atenciones