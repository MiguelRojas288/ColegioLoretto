import { Mail } from 'react-feather'

// ** Custom Components
import StatsWithLineChart from '@components/widgets/stats/StatsWithLineChart'

const ComponenteGraficoPequeño = ({ warning }) => {
  // ** State

  const data = {
    series: [
        {
          name: 'Registro de Tareas',
          data: [365, 390, 365, 400, 375, 400]
        }
      ]
  }

  const options = {
    chart: {
      id: 'newsletter',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 5,
        left: 0,
        blur: 4,
        opacity: 0.1
      }
    },
    grid: {
      show: false
    },
    colors: [warning],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        gradientToColors: ['#ffc085'],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      }
    },

    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      x: { show: false }
    }
  }

  return (
    <StatsWithLineChart
      icon={<Mail size={21} />}
      color='warning'
      stats='342'
      statTitle='Registro de Tareas'
      series={data.series}
      type='line'
      options={options}
    />
  )
}

export default ComponenteGraficoPequeño