// ** Reactstrap Imports
import { Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bell, Link } from 'react-feather'

// ** User Components
import InvoiceList from './InvoiceList'
import SecurityTab from './SecurityTab'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <>
    <Card>
      <CardBody>

      <Nav pills className='mb-0'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Información</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Seguridad</span>
          </NavLink>
        </NavItem>

        
      </Nav>     
      </CardBody>
    </Card>

      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <InvoiceList />
        </TabPane>
        <TabPane tabId='2'>
          <SecurityTab />
        </TabPane>
      </TabContent>
    </>
  )
}
export default UserTabs
