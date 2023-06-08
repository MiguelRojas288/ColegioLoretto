import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const MySwal = withReactContent(Swal)

const ComponenteHandleEditContra = () => {

    return MySwal.fire({
        title: 'Contraseña modificada',
        icon: 'success',
        showConfirmButton: false,
        timer: 1800
        // position: 'bottom-start',
    })
}

export default ComponenteHandleEditContra