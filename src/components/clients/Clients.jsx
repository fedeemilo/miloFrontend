import React from "react";
import { clientTableThs } from "../../helpers/tablesThArray";
import Layout from "../utils/Layout";

const Clients = () => {
  return (
    <div>
      <Layout
        title="clients"
        arrTableThs={clientTableThs}
        h1="Clientes"
        h3="Cliente"
      />
    </div>
  );
};

export default Clients;
