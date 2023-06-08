import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

const MySwal = withReactContent(Swal)

const ComponenteHandleWarning = () => {

    return MySwal.fire({
        title: 'No se realizó el registro',
        text: 'No se permiten registros duplicados',
        icon: 'warning',
        confirmButtonText: 'Intentar nuevo registro',
        customClass: {
        confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}

export default ComponenteHandleWarning