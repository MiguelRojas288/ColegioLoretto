// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card } from 'reactstrap'

const ComponenteDataTable = ({ columnas, datos }) => {

  // Opciones de paginacion
  const opcionesDePaginacion = {
      rowsPerPageText: 'Filas por Página',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsItemText: 'Todos'
  }

  return (
    <Card className='overflow-hidden'>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          data={datos}
          columns={columnas}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          paginationComponentOptions={opcionesDePaginacion}
        />
      </div>
    </Card>
  )
}

export default ComponenteDataTable
