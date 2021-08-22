import React from "react";
import { Box, NavBar } from "../";

const Main = () => {
  return (
    <div>
      <NavBar />

      {/* boxes */}
      <div className="boxes mt-4" style={{ height: "80vh" }}>
        <Box
          name="Repuestos y Componentes"
          color="bg-dark"
          to="/spare-parts"
        />
        <Box
          name="Clientes"
          color="bg-gray"
          to="/clients"
          newFeature={true}
        />
        <Box name="Reparaciones" color="bg-dark" disabled={true} to='/repairs' />
        <Box name="Ajustes" color="bg-gray" disabled={true} />
      </div>
    </div>
  );
};

export default Main;
