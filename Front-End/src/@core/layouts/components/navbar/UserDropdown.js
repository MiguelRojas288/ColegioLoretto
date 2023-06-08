// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Power,
} from "react-feather";

// import metodoGetById from '../servicios/peticionesHTTP/getById'
import metodoGetById from '../../../../views/servicios/peticionesHTTP/getById'

// context
import { Context } from '../../../../views/context/Context'

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/sin-foto.png";

const UserDropdown = () => {

  const navigate = useNavigate()

  const { setObjetoAuxUsuarios } = useContext(Context)

  const usuarioDatos = JSON.parse(sessionStorage.getItem('User'))

  const userToken = JSON.parse(sessionStorage.getItem('User'))
  const modulo = 'usuarios'

  const mostrarMsg = async () => {
    const data = await metodoGetById(modulo, userToken.token, userToken.uid)
    setObjetoAuxUsuarios(data.usuario)
    navigate("/usuarioEditar", { replace: true })
  }

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{usuarioDatos !== null ? usuarioDatos.nombre : 'Sin Datos'}</span>
          <span className="user-status">{usuarioDatos !== null ? usuarioDatos.rol : 'Sin Datos'}</span>
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem onClick={mostrarMsg}>
          <User size={14} className="me-75" />
          <span className="align-middle">Perfil</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/login" onClick={() => (sessionStorage.removeItem('User'))}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Cerrar Sesión</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
