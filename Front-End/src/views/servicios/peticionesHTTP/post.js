
const metodoPost = async (modulo, token, datosCapturados) => {

    const urlApi = "http://localhost:4000/api"

    const cabeceraDePeticionGET = {
        method: 'POST',
            headers: {
                'x-token':`${token}`,
                'Content-Type': 'application/json'
        },
        body: datosCapturados.body
    }

    const respuesta = await fetch(`${urlApi}/${modulo}`, cabeceraDePeticionGET)
    const datos = await respuesta.json()
    const data = datos

    return (
        data
    )

}

export default metodoPost

