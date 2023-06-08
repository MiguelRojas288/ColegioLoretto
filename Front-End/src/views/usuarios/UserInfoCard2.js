// ** React Imports
import { Fragment, useContext, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import { Briefcase, X, Smartphone } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// context
import { Context } from '../context/Context'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

// import avatar1 from '@src/assets/images/portrait/foto.jpg'
import avatar1 from "@src/assets/images/portrait/small/sin-foto.png";

const data2 = {
    avatar: avatar1,
    avatarColor: 'light-primary'
}


const UserInfoCard2 = () => {

  const { objetoAuxUsuarios } = useContext(Context)

  // Dar color a los badges segun su valor
  const statusObj = {
    Activo: 'light-success',
    Inactivo: 'light-danger'
  }


  // ** render user img
  const renderUserImg = () => {
      if (1 === 1) {

      return (
        <img
          height='110'
          width='110'
          alt='user-avataaar'
          src={data2.avatar}
          className='img-fluid rounded mt-1 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color='light-primary'
          className='rounded mt-3 mb-2'
          content={objetoAuxUsuarios.nombres}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }


  useEffect(() => {

  }, [])

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{objetoAuxUsuarios.nombres}{' '}{objetoAuxUsuarios.apellidos}</h4>
                    <Badge color='light-primary' className='text-capitalize'>
                      {objetoAuxUsuarios.cargo}
                    </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Smartphone className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>C.I.</h4>
                <small>{objetoAuxUsuarios.ci}</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>Rol</h4>
                <small>{objetoAuxUsuarios.rol}</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Detalles</h4>
          <div className='info-container'>
            {objetoAuxUsuarios !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Usuario:</span>
                  <span>{objetoAuxUsuarios.nombreDeUsuario}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Correo:</span>
                  <span>{objetoAuxUsuarios.correo}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Estado:</span>
                  <Badge className='text-capitalize' color={statusObj[objetoAuxUsuarios.estado]}>
                    {objetoAuxUsuarios.estado}
                  </Badge>
                </li>

              </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
      
    </Fragment>
  )
}

export default UserInfoCard2
