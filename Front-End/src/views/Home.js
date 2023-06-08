
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button } from "reactstrap"

// ** React Imports
import { useContext, useEffect } from 'react'

// ** Icons Imports
import { Eye, Heart, Award, Truck, ShoppingBag, MessageSquare } from 'react-feather'

import ComponenteHorizontalPequeño from './componentes/estadisticos/horizontalPequeño'
import AvgSession from './componentes/estadisticos/cuadradoPrincipal'
// import ComponentePerfilDeUsuario from './componentes/estadisticos/delPerfil'
import ComponenteVerticalPequeño from './componentes/estadisticos/verticalPequeño'
import ComponenteGraficoPequeño from './componentes/estadisticos/graficoPequeño'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

import moment from 'moment'

// context
// import { Context } from '../context/Context'
import { Context } from '../views/context/Context'

// metodos
import metodoGet from '../../src/views/servicios/peticionesHTTP/get'
import metodoGetById from '../../src/views/servicios/peticionesHTTP/getById'

import img1 from "@src/assets/images/portrait/small/dos.jpg";
import img2 from "@src/assets/images/portrait/small/campana.png";

const Home = () => {

  const context = useContext(ThemeColors)

  const { dataSelectComunicados, setDataSelectComunicados } = useContext(Context)

  const userToken = JSON.parse(sessionStorage.getItem('User'))

  // const llamarMetodoGetComunicados = async () => {

  //   // si es estudiante, consultar y guardar de que curso es
  //   if (userToken.rol === 'Estudiante') {
  //     const data = await metodoGetById('cursos', userToken.token, userToken.idCurso)
  //     const auxUserToken = userToken
  //     auxUserToken.curso = data.curso.nombreDelCurso
  //     sessionStorage.setItem("User", JSON.stringify(auxUserToken))
  //   }

  //   // llamar metodo para obtener todos los comunicados
  //   const data = await metodoGet('comunicados', userToken.token)
  //   const datos = data.comunicados

  //   // seleccionar comunicados segun el tipo de usuario
  //   const nuevoArray = []

  //   if (userToken.rol === 'Profesor') {
  //     datos.forEach(e => {
  //       if (e.rolObjetivo === 'Profesor') {
  //           nuevoArray.push(e)
  //       }  
  //     })

  //   } else if (userToken.rol === 'Estudiante') {
  //     datos.forEach(e => {
  //       if (e.rolObjetivo === 'Todos los Estudiantes') {
  //           nuevoArray.push(e)
  //       } else if (e.rolObjetivo === userToken.curso && e.rolObjetivoGrado === userToken.grado) {
  //           nuevoArray.push(e)
  //       } 
  //     })
  //   } 

  //   setDataSelectComunicados(nuevoArray)
  // }


useEffect(() => {
  // llamarMetodoGetComunicados()
}, [])

  return (
    <div> 
      <Row>
        <Col xl='6' md='6' sm='12'>
          <Row>
            <Col xl='12' md='12' sm='12'>
              <Row>
                <Col xl='6' md='6' sm='6'>
                  <ComponenteHorizontalPequeño icon={<Eye size={21} />} color='info' stats='2' statTitle='Usuarios' />
                </Col>
                <Col xl='6' md='6' sm='6'>
                  <ComponenteHorizontalPequeño icon={<MessageSquare size={21} />} color='success' stats='2' statTitle='Estudiantes' />
                </Col>
              </Row>
            </Col>

            <Col xl='12' md='12' sm='12'>
              <Row>
                <Col xl='12' md='12' sm='12'>
                  {/* <ComponentePerfilDeUsuario /> */}
                  <AvgSession primary={context.colors.primary.main} />
                </Col>
              </Row>
            </Col>

            <Col xl='12' md='12' sm='12'>
              <Row>
                <Col xl='6' md='6' sm='6'>
                  <ComponenteHorizontalPequeño icon={<ShoppingBag size={21} />} color='danger' stats='87' statTitle='Comunicados' />
                </Col>
                <Col xl='6' md='6' sm='6'>
                  <ComponenteHorizontalPequeño icon={<Heart size={21} />} color='primary' stats='12' statTitle='Aún Vigentes' />
                </Col>
              </Row>
            </Col>


          </Row>
        </Col>

        {/* <Col xl='4' md='4' sm='12'>
          <ComponentePerfilDeUsuario />
        </Col> */}

        <Col xl='4' md='4' sm='12'>
          <Row>
            <Col xl='12' md='12' sm='12'>
              <Card>
                <CardImg top src={img1} alt='Card cap' />
                <CardBody>
                  <CardTitle tag='h4'>Reglamento Estudiantil</CardTitle>
                  <CardText>
                    Descargue del siguiente link, el reglamento estudiantil para los estudiantes y maestros del Colegio Italo Boliviano.
                  </CardText>
                  <Button color='primary' outline>
                    Descargar reglamento
                  </Button>
                </CardBody>
              </Card>
            </Col>

            <Col xl='12' md='12' sm='12'>
              <ComponenteGraficoPequeño  warning={context.colors.warning.main}/>
            </Col>

          </Row>
        </Col>

        
        <Col xl='2' md='2' sm='12'>
          <Row>
            <Col xl='12' md='12' sm='12'>
              {/* <ComponenteVerticalPequeño icon={<Heart size={21} />} color='primary' stats='67' statTitle='Cursos' /> */}

              <Card className='text-center card-congratulations'>
                <CardBody >

                  <img className='img-fluid' src={img2} alt='Img citas' />
                  {/* <h2 className='fw-bolder text-white'>{dataSelectComunicados.length}</h2> */}
                  <h2 className='fw-bolder text-white'>5</h2>
                  <p className='card-text line-ellipsis'>Comunicados Vigentes</p>

                  <Button color='danger' className="round">
                    Ver todo
                  </Button>
                </CardBody>
              </Card>

            </Col>

            <Col xl='12' md='12' sm='12'>
              <ComponenteVerticalPequeño icon={<Award size={21} />} color='success' stats='12' statTitle='Grados' />
            </Col>

            <Col xl='12' md='12' sm='12'>
              <ComponenteVerticalPequeño icon={<Truck size={21} />} color='danger' stats='4' statTitle='Góndolas' />
            </Col>

          </Row>
        </Col>

        
      </Row>
    </div>
  );
};

export default Home;

