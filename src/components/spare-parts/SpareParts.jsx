import React, { useMemo } from "react";
import { spareTableThs } from "../../helpers/tablesThArray";
import Layout from "../utils/Layout";

const SpareParts = () => {
  return (
    <div>
      <Layout
        title="spares"
        arrTableThs={useMemo(() => spareTableThs)}
        h1="Repuestos | Componentes"
        h3="Repuesto"
      />
    </div>
  );
}

export default SpareParts;
