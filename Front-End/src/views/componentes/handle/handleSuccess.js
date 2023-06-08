import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const MySwal = withReactContent(Swal)

const ComponenteHandleSuccess = () => {

    return MySwal.fire({
        title: 'Registro correcto',
        icon: 'success',
        showConfirmButton: false,
        timer: 1800
        // position: 'bottom-start',
    })
}

export default ComponenteHandleSuccess