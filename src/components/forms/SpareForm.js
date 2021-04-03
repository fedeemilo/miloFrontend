import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import SearchIcon from "../utils/SearchIcon";

function SpareForm({
  setRepuestos,
  setSearchValSpare,
  cloneRepuestos
}) {
  const [filter, setFilter] = useState("");

  const filterSearch = (searchVal, filter) => {
    let arrAuxRepuestos = [].concat(cloneRepuestos);
    let filterRepuestos = [];

    filterRepuestos = arrAuxRepuestos.filter(rep =>
      rep[filter].toLowerCase().includes(searchVal.toLowerCase())
    );
    setRepuestos(filterRepuestos);
    console.log(filterRepuestos);
  };

  const handleSearch = e => {
    let searchVal = e.target.value;

    setSearchValSpare(true);

    if (searchVal.length > 0) {
      if (filter === "Nombre") {
        filterSearch(searchVal, "nombre");
      } else {
        filterSearch(searchVal, "ubicacion");
      }
    } else {
      setSearchValSpare(false);
    }
  };

  const handleNameFilter = e => {
    setFilter(e.target.value);
  };

  const handleDescFilter = e => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <div className="d-flex flex-column mt-3">
            <div className="m-1">
              <SearchIcon />
              <Input
                className="text-center"
                style={{ height: "3rem", fontSize: "1.4rem" }}
                type="text"
                name="componente"
                id="componenteIn"
                onChange={handleSearch}
                disabled={filter === ""}
                placeholder={
                  filter
                    ? `Buscar por ${filter}`
                    : "Elige un filtro para la búsqueda"
                }
              />
            </div>
            <div className="m-1 d-flex justify-content-center">
              <div className="ml-1">
                <FormGroup check>
                  <Label check style={{ fontSize: "1.5rem" }}>
                    <Input
                      className="radio-filter"
                      style={{ width: "1.2rem", height: "1rem" }}
                      onChange={handleNameFilter}
                      type="radio"
                      name="radio1"
                      value="Nombre"
                    />{" "}
                    Nombre
                  </Label>
                </FormGroup>
              </div>
              <div className="ml-3">
                <FormGroup check>
                  <Label check style={{ fontSize: "1.5rem" }}>
                    <Input
                      className="radio-filter"
                      style={{ width: "1.2rem", height: "1rem" }}
                      onChange={handleDescFilter}
                      type="radio"
                      name="radio1"
                      value="Ubicación"
                    />{" "}
                    Ubicación
                  </Label>
                </FormGroup>
              </div>
            </div>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
}

export default SpareForm;
