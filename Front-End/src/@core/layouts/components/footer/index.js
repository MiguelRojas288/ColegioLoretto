// ** Icons Import
import { Heart, PhoneCall } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        <a
          href="https://a"
          target="_blank"
          rel="noopener noreferrer"
        >
          (Colegio Loretto - Área de Psicología) {" "}
        </a>
        <span className="d-none d-sm-inline-block"> - Software de Pruebas Proyectivas.</span>
      </span>
      <span className="float-md-end d-none d-md-block">
        Soporte Técnico al Cel. 79710197
        <PhoneCall size={14} />
      </span>
    </p>
  );
};

export default Footer;
