
import Chart from 'react-apexcharts'

// ** Utils
import { kFormatter } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardText,
  Progress,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

const AvgSessions = props => {
  // ** States
//   const [data, setData] = useState(null)

  const data = {
      sessions: 17,
      last_days: ['Última Semana', 'Último Mes', 'Último Año'],
      growth: '+5.2%',
      goal: 2,
      users: 65,
      retention: 2,
      duration: 23

  }

//   useEffect(() => {
//     axios.get('/card/card-analytics/avg-sessions').then(res => setData(res.data))
//     return () => setData(null)
//   }, [])

  const options = {
      chart: {
        sparkline: { enabled: true },
        toolbar: { show: false }
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
      states: {
        hover: {
          filter: 'none'
        }
      },
      colors: ['#ebf0f7', '#ebf0f7', props.primary, '#ebf0f7', '#ebf0f7', '#ebf0f7'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          borderRadius: [10]
        }
      },
      tooltip: {
        x: { show: false }
      },
      xaxis: {
        type: 'numeric'
      }
    },
    series = [
      {
        name: 'Casos',
        data: [75, 125, 225, 175, 125, 75, 25]
      }
    ]

  return (
    <Card>
      <CardBody>
        <Row className='pb-50'>
          <Col
            sm={{ size: 6, order: 1 }}
            xs={{ order: 2 }}
            className='d-flex justify-content-between flex-column mt-lg-0 mt-2'
          >
            <div className='session-info mb-1 mb-lg-0'>
              <h2 className='fw-bold mb-25'>{kFormatter(data.sessions)}</h2>
              <CardText className='fw-bold mb-2'>Entregas de Tareas</CardText>
              <h5 className='font-medium-2'>
                <span className='text-success me-50'>{data.growth}</span>
                <span className='fw-normal'>más que el anterior mes</span>
              </h5>
            </div>
            <Button color='primary'>Ver detalles</Button>
          </Col>
          <Col
            sm={{ size: 6, order: 2 }}
            xs={{ order: 1 }}
            className='d-flex justify-content-between flex-column text-end'
          >
            <UncontrolledDropdown className='chart-dropdown'>
              <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                Últimos 7 días
              </DropdownToggle>
              <DropdownMenu end>
                {data.last_days.map(item => (
                  <DropdownItem className='w-100' key={item}>
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Chart options={options} series={series} type='bar' height={200} />
          </Col>
        </Row>
        <hr />
        <Row className='pt-50'>
          <Col className='mb-2' md='6' sm='12'>
            <p className='mb-50'>Nuevos estudiantes: {data.goal}</p>
            <Progress className='avg-session-progress progress-bar-info mt-25' value='50' />
          </Col>
          <Col className='mb-2' md='6' sm='12'>
            <p className='mb-50'>Usos del Sistema: {kFormatter(data.users)}</p>
            <Progress className='avg-session-progress progress-bar-warning mt-25' value='60' />
          </Col>
          <Col md='6' sm='12'>
            <p className='mb-50'>Tareas no Entregadas: {data.retention}</p>
            <Progress className='avg-session-progress progress-bar-danger mt-25' value='70' />
          </Col>
          <Col md='6' sm='12'>
            <p className='mb-50'>Tareas Entregadas: {data.duration}</p>
            <Progress className='avg-session-progress progress-bar-success mt-25' value='80' />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default AvgSessions
