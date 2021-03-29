import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

function SpareForm({ repuestos, setRepuestos, setSearchValSpare }) {
  const [filter, setFilter] = useState("");


  const filterSearch = (searchVal, filter) => {
    let auxRepuestos = [].concat(repuestos);
    let filterRepuestos = [];


    filterRepuestos = auxRepuestos.filter((rep) =>
      rep[filter].toLowerCase().includes(searchVal.toLowerCase())
    );
    setRepuestos(filterRepuestos);
  }

  const handleSearch = (e) => {
    let searchVal = e.target.value;

    setSearchValSpare(true);

    if (searchVal.length > 0) {
      if (filter === "Nombre") {
        filterSearch(searchVal, "nombre")
      } else {
        filterSearch(searchVal, "ubicacion")
      }
    } else {
      setSearchValSpare(false);
    }
  };

  const handleNameFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDescFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <div className="d-flex flex-column mt-3">
            <div className="m-1">
              <Label for="exampleEmail">
                Buscar repuesto/componente
              </Label>
              <Input
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
            <div className="m-1 d-flex">
              <div className="ml-1">
                <FormGroup check>
                  <Label check>
                    <Input
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
                  <Label check>
                    <Input
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
