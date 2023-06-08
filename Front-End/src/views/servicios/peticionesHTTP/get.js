
const metodoGet = async (modulo, token) => {

    const urlApi = "http://localhost:4000/api"

    const cabeceraDePeticionGET = {
        method: 'GET',
            headers: {
                'x-token':`${token}`
        }
    }

    const respuesta = await fetch(`${urlApi}/${modulo}`, cabeceraDePeticionGET)
    const datos = await respuesta.json()
    const data = datos

    return (
        data
    )

}

export default metodoGet