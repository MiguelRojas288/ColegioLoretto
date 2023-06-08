import { Home, Users, User, Airplay, TrendingUp, CheckCircle, Clipboard, FileText } from "react-feather";

export default [
  {
    header: 'Inicio'
  },
  {
    id: "home",
    title: "Inicio",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    header: 'Personas'
  },
  {
    id: "usuarios",
    title: "Usuarios",
    icon: <User size={20} />,
    navLink: "/usuarios",
  },
  {
    id: "estudiantes",
    title: "Estudiantes",
    icon: <Users size={20} />,
    navLink: "/estudiantes",
  },
  {
    header: 'De uso continuo'
  },
  {
    id: "materias",
    title: "Pruebas Proyectivas",
    icon: <Airplay size={20} />,
    navLink: "/materias",
  },
  {
    id: "atenciones",
    title: "Form. de Atención",
    icon: <FileText size={20} />,
    navLink: "/atenciones",
  },
  {
    id: "gondolas",
    title: "Informes",
    icon: <Clipboard size={20} />,
    navLink: "/gondolas",
  },
  {
    id: "grados",
    title: "Resultados de P.P.",
    icon: <CheckCircle size={20} />,
    navLink: "/grados",
  },
  {
    id: "cursos",
    title: "Estadísticas",
    icon: <TrendingUp size={20} />,
    navLink: "/cursos",
  },

];
