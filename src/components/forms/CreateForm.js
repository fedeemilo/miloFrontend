import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function CreateForm({ toggleCreate }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quant, setQuant] = useState(0);
  const [loc, setLoc] = useState("");

  const handleCreateName = (e) => {
    setName(e.target.value);
  };

  const handleCreateDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleCreateQuant = (e) => {
    setQuant(e.target.value);
  };

  const handleCreateLocation = (e) => {
    setLoc(e.target.value);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    let body = {
      nombre: name,
      descripcion: desc,
      cantidad: quant,
      ubicacion: loc
    };

    axios
      .post(
        "https://milo-soft-backend.herokuapp.com/repuestos",
        body
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    toggleCreate();
  };

  return (
    <div>
      <Form onSubmit={handleCreateSubmit}>
        <FormGroup>
          <Label for="nombre">Nombre</Label>
          <Input
            type="text"
            name="nombre"
            id="nombreIn"
            placeholder="Escribe el nombre..."
            onChange={handleCreateName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="descripcion">Descripción</Label>
          <Input
            type="text"
            name="descripcion"
            id="descripcionIn"
            placeholder="Escribe la descripción..."
            onChange={handleCreateDesc}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cantidad">Cantidad</Label>
          <Input
            type="number"
            name="cantidad"
            id="cantidadIn"
            placeholder="Escribe la cantidad..."
            onChange={handleCreateQuant}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ubicacion">Ubicación</Label>
          <Input
            type="text"
            name="ubicacion"
            id="ubicacionIn"
            placeholder="Escribe la ubicación..."
            onChange={handleCreateLocation}
          />
        </FormGroup>
        <Button
          color="danger"
          className="float-right ml-2"
          onClick={() => toggleCreate()}
        >
          Cancelar
        </Button>
        <Button type="submit" color="primary" className="float-right">
          Crear
        </Button>
      </Form>
    </div>
  );
}

export default CreateForm;
