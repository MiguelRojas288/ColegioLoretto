import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'

// metodos
import metodoDelete from '../../servicios/peticionesHTTP/delete'

const ComponenteHandleDelete = (modulo, userToken, id) => {

  const MySwal = withReactContent(Swal)

  const llamarMetodoDelete = async () => {
    await metodoDelete(modulo, userToken.token, id)
  }

    return MySwal.fire({
      title: '¿Desea Eliminar el Registro?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: '!Si, bórralo!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {

      if (result.value) {
        llamarMetodoDelete()
        MySwal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El registro ha sido eliminado',
          showConfirmButton: false,
          timer: 1700
        })
      }
    })
}

export default ComponenteHandleDelete