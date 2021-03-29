import React from "react";
import { Box, NavBar } from "../";

function Main() {
  return (
    <div>
      <NavBar />

      {/* boxes */}
      <div className="boxes mt-4" style={{ height: "80vh" }}>
        <Box name="Repuestos y Componentes" color="bg-dark" disabled={false} to='/spare-parts' />
        <Box name="Clientes" color="bg-gray" disabled={true} />
        <Box name="Turnos" color="bg-dark" disabled={true} />
        <Box name="Ajustes" color="bg-gray" disabled={true} />
      </div>
    </div>
  );
}

export default Main;
