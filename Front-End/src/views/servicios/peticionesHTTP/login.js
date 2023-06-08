
const metodoPostLogin = async (datosCapturados) => {

    const urlApi = "http://localhost:4000/api"

    const { nombreDeUsuario, password } = datosCapturados

    // console.log(nombres)

    const cabeceraDePeticionGET = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            nombreDeUsuario,
            password
        })
    }

    const respuesta = await fetch(`${urlApi}/auth`, cabeceraDePeticionGET)
    const datos = await respuesta.json()
    const data = datos

    return (
        data
    )

}

export default metodoPostLogin

