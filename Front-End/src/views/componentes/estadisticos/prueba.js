// context
import { useContext } from 'react'
import { Context } from '../../context/Context'
import { useEffect } from 'react'
import { Col, Row, Button, Card, CardBody, CardHeader, CardTitle, CardText } from 'reactstrap'

import metodoGet from '../../servicios/peticionesHTTP/get'
import metodoGetById from '../../servicios/peticionesHTTP/getById'

import moment from 'moment'


const Prueba = () => {

  const userToken = JSON.parse(sessionStorage.getItem('User'))

  const { dataSelectComunicados, setDataSelectComunicados } = useContext(Context)

  const llamarMetodoGetComunicados = async () => {

    // si es estudiante, consultar y guardar de que curso es
    if (userToken.rol === 'Estudiante') {
      const data = await metodoGetById('cursos', userToken.token, userToken.idCurso)
      const auxUserToken = userToken
      auxUserToken.curso = data.curso.nombreDelCurso
      sessionStorage.setItem("User", JSON.stringify(auxUserToken))
    }

    // llamar metodo para obtener todos los comunicados
    const data = await metodoGet('comunicados', userToken.token)
    const datos = data.comunicados

    // seleccionar comunicados segun el tipo de usuario
    const nuevoArray = []

    if (userToken.rol === 'Profesor') {
      datos.forEach(e => {
        if (e.rolObjetivo === 'Profesor') {
            nuevoArray.push(e)
        }  
      })

    } else if (userToken.rol === 'Estudiante') {
      datos.forEach(e => {
        if (e.rolObjetivo === 'Todos los Estudiantes') {
            nuevoArray.push(e)
        } else if (e.rolObjetivo === userToken.curso && e.rolObjetivoGrado === userToken.grado) {
            nuevoArray.push(e)
        } 
      })
    } 

    setDataSelectComunicados(nuevoArray)
  }

  const verificarData = () => {
    if (dataSelectComunicados.length < 1) {
      llamarMetodoGetComunicados()
    }
  }

  const fechaUno = '2023-05-08T18:53:41-04:00'
  const fechDos = '2023-05-04T18:53:41-04:00'

  const validarFecha = () => {
    if(Date.parse(fechaUno) < Date.parse(fechDos)){
      console.log('La fecha dos es menor que la uno')
    }else{
      console.log('La fecha dos es mayor...')
    }
  }

  useEffect(() => {
    verificarData()
    validarFecha()
  }, [])

  return (
    <Row>
      {dataSelectComunicados.map((comunicado) => {
        return (
          <Col xl='4' md='4' sm='4' key={comunicado.id}>
              <Card>
                  <CardHeader>Desde el: {moment(comunicado.fechaInicio).format('DD-MM-YYYY')} al {moment(comunicado.fechaFin).format('DD-MM-YYYY')}</CardHeader>
                  <CardBody>
                    <CardTitle tag='h4'>{comunicado.titulo}</CardTitle>
                    <CardText>
                      {comunicado.descripcion}
                    </CardText>
                    <Button color='primary' outline>
                        Ver completo
                    </Button>
                  </CardBody>
              </Card>
          </Col>

        )
      })}

    </Row>
  )
}

export default Prueba