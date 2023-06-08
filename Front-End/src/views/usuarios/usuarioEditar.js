// ** React Imports
import { useState, useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard2 from './UserInfoCard2'

import ComponenteBreadcump from '../componentes/breadcump'

// context
import { Context } from '../context/Context'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useEffect } from 'react'

const UserView = () => {

  // const userToken = JSON.parse(sessionStorage.getItem('User'))
  // const modulo = 'usuarios'

  const { objetoAuxUsuarios, setObjetoAuxUsuarios } = useContext(Context)

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  useEffect(() => {
    // llamarMetodoGetById(userToken.uid)
  }, [])


  return (
    <>
      <ComponenteBreadcump titulo={'Editar Perfil'}/>
      <div className='app-user-view'>
        <Row>
          <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard2 datos={objetoAuxUsuarios} />
          </Col>
          <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} />
          </Col>
        </Row>
      </div>
    </>
  )
}
export default UserView
