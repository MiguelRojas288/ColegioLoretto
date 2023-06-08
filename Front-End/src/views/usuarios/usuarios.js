// react, reacstrap  y react father
import { useEffect, useContext, useState } from 'react'
import { InputGroup, InputGroupText, Input, Row, Col, Button, Card, CardBody, UncontrolledTooltip, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap'
import { Flag, Plus, Search, Edit2, Trash2, Eye } from 'react-feather'
// import classnames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

// metodos
import metodoGet from '../servicios/peticionesHTTP/get'
// import metodoGetById from '../servicios/peticionesHTTP/getById'

// context
import { Context } from '../context/Context'

// variables
import { columns } from './columns'

// componentes
import ComponenteBreadcump from '../componentes/breadcump'
import ComponenteDataTable from '../componentes/datatable'
import ComponenteModalNuevoUsuario from '../componentes/modales/usuarios/nuevoUsuario'
import ComponenteHandleDelete from '../componentes/handle/handleDelete'

// Estilos del DataTable
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import ComponenteOffCanvasAyuda from '../componentes/canvas/offCanvas'

// import Prism from 'prismjs'


const Usuarios = () => {

//-------------------------------------------------- VARIABLES Y ESTADOS --------------------------------------------------------------

    const navigate = useNavigate()

    const userToken = JSON.parse(sessionStorage.getItem('User'))
    const modulo = 'usuarios'

    const { 
        // formularios
        formModalStateNuevo, 
        setFormModalStateNuevo, 
        canvasAyuda, 
        setCanvasAyuda,
        // variable auxiliar
        setObjetoAuxUsuarios,
        // data usuarios
        setDataUsuarios, 
        dataUsuarios,
        setDataAuxiliarUsuarios,
        dataAuxiliarUsuarios
    } = useContext(Context)


    const llamarMetodoGet = async () => {
        const data = await metodoGet(modulo, userToken.token)
        setDataUsuarios(data.usuarios)
        setDataAuxiliarUsuarios(data.usuarios)
    }

    // const llamarMetodoGetById = async (id) => {
    //     const data = await metodoGetById(modulo, userToken.token, id)
    //     setObjetoAuxUsuarios(data.usuario)
    // }

    const llamarHandleDelete = async (id) => {
        await ComponenteHandleDelete(modulo, userToken, id)
        setTimeout(llamarMetodoGet, 200)
    }

    const validarRol = () => {
        if (userToken.rol !== 'Director') {
            navigate("/not", { replace: true })
        }
    }

    const toggleCanvasBottom = () => {
        setCanvasAyuda(!canvasAyuda)
    }

    // Funcion de filtrado por barra de busqueda
    const filtrarSegunParametros = e => {
        const a = (e.target.value)
        const filtradito = dataAuxiliarUsuarios.filter(item => {
        if (item.nombres.toLowerCase().includes(a.toLowerCase()) || item.apellidos.toLowerCase().includes(a.toLowerCase()) || item.rol.toLowerCase().includes(a.toLowerCase()) || item.ci.toLowerCase().includes(a.toLowerCase()) || item.estado.toLowerCase().includes(a.toLowerCase())) {
            return item
        }
        })
        setDataUsuarios(filtradito)
    }

    const acciones = [
        {
            name: 'Acciones',
            minWidth: '100px',
            sortable: true,
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Link
                        to='/usuariosEditar'
                        className='d-flex align-items-center justify-content-between p-0'
                        onClick={() => (
                            setObjetoAuxUsuarios(
                                {
                                    id: row.id,
                                    nombres: row.nombres, 
                                    apellidos: row.apellidos, 
                                    ci: row.ci, 
                                    celular: row.celular,
                                    nombreDeUsuario: row.nombreDeUsuario,
                                    password: row.password,
                                    correo: row.correo,
                                    fotoDePerfil: row.fotoDePerfil,
                                    rol: row.rol,
                                    estado: row.estado
                                }
                            )
                        )}
                    >
                        <Eye size={17} className='mx-2'/>
                    </Link>

                    <Trash2 className='cursor-pointer' size={17} id={`send-tooltip-3-${row.id}`} onClick={() => llamarHandleDelete(row.id)}/>
                    <UncontrolledTooltip placement='top' target={`send-tooltip-3-${row.id}`}>
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
        validarRol()
        llamarMetodoGet()
    }, [])


//----------------------------------------------------VISUAL / COMPONENTES--------------------------------------------------------------

    return (
        <>
            <ComponenteBreadcump titulo={'Usuarios'}/>
        
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
                                <span className='align-middle ml-25'> Nuevo Usuario</span>
                            </Button>
                        </Col>

                    </Row> 
                </CardBody>
            </Card>

            <Card>
                <ComponenteDataTable columnas={columns.concat(acciones)} datos={dataUsuarios}/>
            </Card>
            
            <Card>
                <ComponenteOffCanvasAyuda />
            </Card>


{/* ---------------------------------------------------- VISUAL / COMPONENTES -------------------------------------------------------------- */}

            <ComponenteModalNuevoUsuario/>
        </>
    )
}

export default Usuarios