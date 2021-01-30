import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { handleSubmitRep } from "../../helpers/dbHelper";

function RepForm({ repArr, setRepArr }) {
  const [component, setComponent] = useState("");
  const [description, setDescription] = useState("");

  const handleComponentChange = (e) => {
    setComponent(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Form
      onSubmit={(e) =>
        handleSubmitRep(
          e,
          component,
          description,
          repArr,
          setRepArr
        )
      }
    >
      <FormGroup>
        <Label for="exampleEmail">Componente</Label>
        <Input
          type="text"
          name="componente"
          id="componenteIn"
          placeholder="Escribe el código del componente..."
          onChange={handleComponentChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Descripción (opcional)</Label>
        <Input
          type="text"
          name="descripcion"
          id="descripcionIn"
          placeholder="Escribe una descripción del componente..."
          onChange={handleDescriptionChange}
        />
      </FormGroup>

      <Button type="submit">Buscar</Button>
    </Form>
  );
}

export default RepForm;
