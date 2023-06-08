import { Badge } from 'reactstrap'

// Dar color a los badges segun su valor
const statusObj = {
  Masculino: 'light-info',
  Femenino: 'light-warning',
  'Sin Especificar': 'light-success'
}

export const columns = [

    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true
    },
    {
      name: 'Curso',
      selector: row => row.curso,
      sortable: true
    },
    {
      name: 'Edad',
      selector: row => row.edad,
      sortable: true
    },
    {
        name: 'Sexo',
        selector: row => row.sexo,
        sortable: true,
        cell: row => (
          <Badge className='text-capitalize' color={statusObj[row.sexo]} pill>
            {row.sexo}
          </Badge>
        )
    }
]

