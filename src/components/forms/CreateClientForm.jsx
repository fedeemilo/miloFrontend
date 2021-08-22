import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { handleSetValue } from "../utils/functions";
import { __db__ } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { createNewClientAction } from "../../redux/clientDucks";
import { alertSuccessOffAction } from "../../redux/globalDucks";

const CreateClientForm = ({ toggleCreate }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDirec] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [observaciones, setObs] = useState("");

  // redux
  const dispatch = useDispatch();
  const spinnerOn = useSelector(store => store.global.spinnerOn);

  // handle submittion
  const handleSubmitClient = async e => {
    e.preventDefault();

    let body = {
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      observaciones
    };

    dispatch(createNewClientAction(body, toggleCreate));

    setTimeout(() => {
      dispatch(alertSuccessOffAction());
    }, 3000);
  };

  return (
    <div className="user-select-none">
      <Form onSubmit={handleSubmitClient}>
        <div className="d-flex justify-content-around">
          <div className="width40">
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                name="nombre"
                id="nombreIn"
                placeholder="Escribe el nombre..."
                onChange={e => handleSetValue(setNombre, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input
                type="text"
                name="apellido"
                id="apellidoIn"
                placeholder="Escribe la apellido..."
                onChange={e => handleSetValue(setApellido, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="direccion">Dirección</Label>
              <Input
                type="text"
                name="direccion"
                id="direccionIn"
                placeholder="Escribe la dirección..."
                onChange={e => handleSetValue(setDirec, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="telefono">Teléfono</Label>
              <Input
                type="text"
                name="telefono"
                id="telefonoIn"
                placeholder="Escribe el teléfono..."
                onChange={e => handleSetValue(setTelefono, e)}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="emailIn"
                placeholder="Escribe el email..."
                onChange={e => handleSetValue(setEmail, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="observaciones">Observaciones</Label>
              <Input
                type="textarea"
                name="observaciones"
                id="observacionesIn"
                placeholder="Escribe las observaciones..."
                rows="8"
                onChange={e => handleSetValue(setObs, e)}
              />
            </FormGroup>
          </div>
        </div>
        <Spinner
          color="primary"
          style={{ marginLeft: "34rem" }}
          className={`${!spinnerOn ? "d-none" : ""}`}
        />
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
};

export default CreateClientForm;
