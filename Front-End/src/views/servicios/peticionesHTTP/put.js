
const metodoPutById = async (modulo, token, id, datos) => {

    const urlApi = "http://localhost:4000/api"

    const cabeceraDePeticionGET = {
        method: 'PUT',
            headers: {
                'x-token':`${token}`,
                'Content-Type': 'application/json'
        },
        body: datos.body
    }

    const respuesta = await fetch(`${urlApi}/${modulo}/${id}`, cabeceraDePeticionGET)
    const dato = await respuesta.json()
    const data = dato

    return (
        data
    )

}

export default metodoPutById