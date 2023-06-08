// ** React Imports
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import metodoGetById from '../servicios/peticionesHTTP/getById'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

import ComponenteBreadcump from '../componentes/breadcump'

// context
import { Context } from '../context/Context'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = () => {

  // const [datos, setDatos] = useState()

  const { objetoAuxUsuarios } = useContext(Context)

  const userToken = JSON.parse(sessionStorage.getItem('User'))
  const modulo = 'usuarios'

    // const llamarMetodoGetById = async (id) => {
    //   if (id === !undefined) {
    //     const data = await metodoGetById(modulo, userToken.token, id)
    //     setObjetoAuxUsuarios(data.usuario)
    //   }
    // }

  // ** Get suer on mount
  useEffect(() => {
    // console.log(objetoAuxUsuarios)
    // llamarMetodoGetById(objetoAuxUsuarios)
  }, [])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return objetoAuxUsuarios !== null && objetoAuxUsuarios !== undefined ? (
    <>
      <ComponenteBreadcump titulo={'Usuarios'} titulo2={'Editar Usuario '} link={'/usuarios'}/>
      <div className='app-user-view'>
        <Row>
          <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard datos={objetoAuxUsuarios} />
          </Col>
          <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} />
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>No existe el id del usuario</h4>
      <div className='alert-body'>
        Regrese a la vista de usuarios presionando aquí: <Link to='/usuarios'>Módulo Usuarios</Link>
      </div>
    </Alert>
  )
}
export default UserView
