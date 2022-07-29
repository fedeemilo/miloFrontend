import React from "react";
import { Box } from "../";
import Footer from "./Footer";

const Main = () => {
  return (
    <>

      <div className="boxes mt-4 " style={{ height: "80vh" }}>
        <Box
          name="Repuestos y Componentes"
          color="bg-dark"
          to="/spare-parts"
        />
        <Box name="Clientes" color="bg-gray" to="/clients" />
        <Box name="Reparaciones" color="bg-dark" to="/repairs" />
        <Box name="Ajustes" color="bg-gray" disabled={true} to="/adjusts" />
      </div>

      <Footer />
    </>
  );
};

export default Main;
