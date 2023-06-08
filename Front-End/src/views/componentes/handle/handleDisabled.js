import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

// metodos
import metodoPutById from '../../servicios/peticionesHTTP/put'

const ComponenteHandleDisabled = (modulo, userToken, id, usuario, datos) => {

  const MySwal = withReactContent(Swal)

  const llamarMetodoUpdate = async () => {
    await metodoPutById(modulo, userToken.token, id, datos)
  }

    return MySwal.fire({
      title: `¿Desea Suspender al Usuario: "${usuario}"?`,
      text: "Luego podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, suspender',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {

      if (result.value) {
        llamarMetodoUpdate()
        MySwal.fire({
          icon: 'success',
          title: 'Modificación Realizada',
          text: 'El usuario ha sido suspendido',
          showConfirmButton: false,
          timer: 1700
        })
      }
    })
}

export default ComponenteHandleDisabled