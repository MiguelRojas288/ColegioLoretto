import { Badge } from 'reactstrap'

export const columns2 = [

    {
        name: 'Navegador',
        selector: row => row.browser,
        sortable: true
    },
    {
        name: 'Dispositivo',
        selector: row => row.device,
        sortable: true
    },
    {
      name: 'Ubicacion',
      selector: row => row.location,
      sortable: true
    },
    {
      name: 'Actividad',
      selector: row => row.activity,
      sortable: true
    }
]
