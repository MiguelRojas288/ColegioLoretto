
const metodoDelete = async (modulo, token, id) => {

    const urlApi = "http://localhost:4000/api"

    const cabeceraDePeticionGET = {
        method: 'DELETE',
            headers: {
                'x-token':`${token}`
        }
    }

    const respuesta = await fetch(`${urlApi}/${modulo}/${id}`, cabeceraDePeticionGET)
    const datos = await respuesta.json()
    const data = datos

    return (
        data
    )

}

export default metodoDelete