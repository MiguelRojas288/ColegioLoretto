import Avatar from '@components/avatar'
import { Badge } from 'reactstrap'

// Renderizar dibujito del cliente
const renderClient = row => {
    const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]
    return <Avatar color={color || 'primary'} className='mr-1' content={row.nombres || 'John Doe'} initials />
}

// Dar color a los badges segun su valor
const statusObj = {
    Activo: 'light-success',
    Inactivo: 'light-danger'
}

export const columns = [
    {
      name: 'Nombres',
      selector: row => row.nombres,
      minWidth: '270px',
      sortable: true,
      cell: row => (
          <div className='d-flex justify-content-left align-items-center'>
            {renderClient(row)}
            <div className='user-info text-truncate ms-1'>
              <span className='d-block fw-bold text-truncate'>{row.nombres}</span>
              {/* <small className='text-truncate text-muted mb-0'>{row.apellidos}</small> */}
              <small>{row.apellidos}</small>
            </div>
          </div>
      )
    },
    {
      name: 'C.I.',
      selector: row => row.ci,
      sortable: true
    },
    {
      name: 'Rol',
      minWidth: '250px',
      selector: row => row.rol,
      sortable: true
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      sortable: true,
      cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.estado]} pill>
          {row.estado}
        </Badge>
      )
    }
]