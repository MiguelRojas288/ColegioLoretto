import Sidebar from '@components/sidebar'
import { ModalBody, Button, Label, Input, Row, Col } from 'reactstrap'
import { X } from 'react-feather'

import imgDetalles from "@src/assets/images/banner/ver-detalles.png"


const SidebarView = ({ open, toggleSidebar, datos }) => {

    return (
        <Sidebar
            // lg - sm -xl
            size='lg'
            open={open}
            title='Detalles del Centro de Internación'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
        <ModalBody>
            <Row>

                <Col xl='12' md='12' sm='12'>
                    <div className='mt-1 mb-2 text-center d-none d-md-block'>
                        <img src={imgDetalles} alt="Imagen Detalles" width="303" height="71" />
                    </div>
                </Col>

                <Col xl='12' md='12' sm='12'>
                    <div className='mb-1'>
                        <Label className='form-label' for='nombreClinica'> Nombre del Centro de Internación </Label>
                        <Input id='nombreClinica' defaultValue={ datos !== undefined ? datos.nombreClinica : 'Sin Datos' } disabled/>
                    </div>
                </Col>

            </Row>

            <hr/>
            <div className='d-flex align-items-center justify-content-center'>
                <Button className='me-0' color='primary' type='submit' onClick={toggleSidebar}>
                    <X size={15} />
                    {" "}<span className='align-middle ml-25'>Cerrar</span>
                </Button>
            </div>
        </ModalBody>  

        </Sidebar>
    )
}

export default SidebarView