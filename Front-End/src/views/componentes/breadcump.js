import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'


const ComponenteBreadcump = ({ titulo, titulo2, link }) => {

  return titulo2 === undefined ? (
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-0">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h3 className="content-header-title float-start mb-0">{titulo}</h3>
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                <BreadcrumbItem>
                    <Link to='/home'> Inicio </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <span>{titulo}</span>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <br/>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-0">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h3 className="content-header-title float-start mb-0">{titulo}</h3>
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                <BreadcrumbItem>
                    <Link to='/home'> Inicio </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to={link}> {titulo} </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <span>{titulo2}</span>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <br/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponenteBreadcump
