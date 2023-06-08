// HandleTada
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const MySwal = withReactContent(Swal)

const ComponenteHandleError = () => {

    return MySwal.fire({
        title: 'Algo salió mal',
        text: 'Por favor contáctate con Soporte Técnico al 72500875 - 72981215',
        icon: 'error',
        confirmButtonText: 'Entendido',
        customClass: {
        confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}

export default ComponenteHandleError
