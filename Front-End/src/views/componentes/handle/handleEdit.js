import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const MySwal = withReactContent(Swal)

const ComponenteHandleEdit = () => {

    return MySwal.fire({
        title: 'Registro modificado',
        icon: 'success',
        showConfirmButton: false,
        timer: 1800
        // position: 'bottom-start',
    })
}

export default ComponenteHandleEdit