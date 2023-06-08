// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import navigationAdmin from "@src/navigation/vertical"
import navigationSub from "@src/navigation/vertical/navigationSub"
import { useEffect, useState } from "react";
import { Home } from "react-feather";

const VerticalLayout = (props) => {

  const auxiliar = [
    {
      id: "home",
      title: "Inicio",
      icon: <Home size={20} />,
      navLink: "/home",
    }, 
  ] 

  const [navegacion, setNavegacion] = useState()

  const userToken = JSON.parse(sessionStorage.getItem('User'))

  const determinarRol = (rol) => {
     if (rol === 'Director') {
      setNavegacion(navigationAdmin)
     }
     else if (rol === 'Profesional Psicólogo') {
      setNavegacion(navigationSub)
     }
     else if (rol === 'Ninguno') {
      setNavegacion(auxiliar)
     }
  }

  useEffect(() => {
    determinarRol(userToken !== null ? userToken.rol : 'Ninguno')
  }, [])

  return (
    <Layout menuData={navegacion} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
