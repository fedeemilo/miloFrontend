import React from "react";
import { spareTableThs } from "../../helpers/tablesThArray";
import Layout from "../utils/Layout";

function SpareParts() {
  return (
    <div>
      <Layout
        title="spares"
        arrTableThs={spareTableThs}
        h1="Repuestos | Componentes"
        h3="Repuesto"
      />
    </div>
  );
}

export default SpareParts;
