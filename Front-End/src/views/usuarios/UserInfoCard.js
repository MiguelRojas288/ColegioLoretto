// ** React Imports
import { Fragment, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Check, Briefcase, X, Smartphone } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'
import ComponenteHandleDisabled from '../componentes/handle/handleDisabled'
import ComponenteHandleEnabled from '../componentes/handle/handleEnabled'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

// import avatar1 from '@src/assets/images/portrait/foto.jpg'
import avatar1 from "@src/assets/images/portrait/small/sin-foto.png";

const data2 = {
    avatar: avatar1,
    avatarColor: 'light-primary'
}


const MySwal = withReactContent(Swal)

const UserInfoCard = ({ datos }) => {

  const navigate = useNavigate()

  const userToken = JSON.parse(sessionStorage.getItem('User'))
  const modulo = 'usuarios'

  // Dar color a los badges segun su valor
  const statusObj = {
    Activo: 'light-success',
    Inactivo: 'light-danger'
  }

  const aux1 = {
    body: JSON.stringify({
      id: datos.id,
      ci: datos.ci,
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      correo: datos.correo,
      rol: datos.rol,
      nombreDeUsuario: datos.nombreDeUsuario,
      password: datos.password,
      fotoDePerfil: datos.fotoDePerfil,
      estado: 'Activo'
    })
  }

  const aux2 = {
    body: JSON.stringify({
      id: datos.id,
      ci: datos.ci,
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      correo: datos.correo,
      rol: datos.rol,
      nombreDeUsuario: datos.nombreDeUsuario,
      password: datos.password,
      fotoDePerfil: datos.fotoDePerfil,
      estado: 'Inactivo'
    })
  }

  // ** render user img
  const renderUserImg = () => {
    // if (datos !== null && !datos.foto) {
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
          content={datos.nombres}
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

  const actualizar = () => {
    navigate("/usuarios") 
  }

  const llamarHandleDisabled = async (id, usuario) => {
    await ComponenteHandleDisabled(modulo, userToken, id, usuario, aux2)
    setTimeout(actualizar, 1500) 
  }

  const llamarHandleEnabled = async (id, usuario) => {
    await ComponenteHandleEnabled(modulo, userToken, id, usuario, aux1)
    setTimeout(actualizar, 1500) 
  }


  useEffect(() => {
    // console.log(datos)
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
                  <h4>{datos.nombres}{' '}{datos.apellidos}</h4>
                    <Badge color='light-primary' className='text-capitalize'>
                      {datos.cargo}
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
                <small>{datos.ci}</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>Rol</h4>
                <small>{datos.rol}</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Detalles</h4>
          <div className='info-container'>
            {datos !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Usuario:</span>
                  <span>{datos.nombreDeUsuario}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Correo:</span>
                  <span>{datos.correo}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Estado:</span>
                  {/* <Badge className='text-capitalize' color={statusColors[datos.status]}> */}
                  {/* <Badge className='text-capitalize' color='light-success'> */}
                  <Badge className='text-capitalize' color={statusObj[datos.estado]}>
                    {datos.estado}
                  </Badge>
                </li>

              </ul>
            ) : null}
          </div>
          <div className='d-flex align-items-center flex-column pt-2'>
            {datos.estado === 'Activo' ? (
              <Button color='danger' outline onClick={() => llamarHandleDisabled(datos.id, datos.nombreDeUsuario)}>
                Suspender Usuario
              </Button>
            ) : <Button color='success' outline onClick={() => llamarHandleEnabled(datos.id, datos.nombreDeUsuario)}>
                  Habilitar Usuario
                </Button>}

            {/* <Button color='danger' outline onClick={() => llamarHandleDisabled(datos.nombres, datos.nombreDeUsuario)}>
              Suspender Usuario
            </Button> */}
          </div>
        </CardBody>
      </Card>
      
    </Fragment>
  )
}

export default UserInfoCard
