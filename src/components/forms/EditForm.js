import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function EditForm({ spare, toggleEdit, setEditAlert }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quant, setQuant] = useState(0);
  const [loc, setLoc] = useState("");

  const handleEditName = (e) => {
    setName(e.target.value);
  };

  const handleEditDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleEditQuant = (e) => {
    setQuant(e.target.value);
  };

  const handleEditLocation = (e) => {
    setLoc(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    let id = spare._id;

    let body = {
      nombre: name,
      descripcion: desc,
      cantidad: quant,
      ubicacion: loc
    };


    let res = await axios.put(
      `https://milo-soft-backend.herokuapp.com/repuestos/${id}`,
      body
    );

    console.log(res.data);

    toggleEdit();
    setEditAlert(true);
  };

  useEffect(() => {
    if (spare) {
      setName(spare.nombre);
      setDesc(spare.descripcion);
      setQuant(spare.cantidad);
      setLoc(spare.ubicacion);
    }
  }, [spare]);

  return (
    <div>
      <Form onSubmit={handleEditSubmit}>
        <FormGroup>
          <Label for="nombre">Nombre</Label>
          <Input
            type="text"
            name="nombre"
            id="nombreIn"
            value={name}
            onChange={handleEditName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="descripcion">Descripción</Label>
          <Input
            type="text"
            name="descripcion"
            id="descripcionIn"
            value={desc}
            onChange={handleEditDesc}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cantidad">Cantidad</Label>
          <Input
            type="number"
            name="cantidad"
            id="cantidadIn"
            value={quant}
            onChange={handleEditQuant}
          />
        </FormGroup>
        <FormGroup>
          <Label for="ubicacion">Ubicación</Label>
          <Input
            type="text"
            name="ubicacion"
            id="ubicacionIn"
            value={loc}
            onChange={handleEditLocation}
          />
        </FormGroup>
        <Button
          color="danger"
          className="float-right ml-2"
          onClick={() => toggleEdit()}
        >
          Cancelar
        </Button>
        <Button type="submit" color="primary" className="float-right">
          Editar
        </Button>
      </Form>
    </div>
  );
}

export default EditForm;
