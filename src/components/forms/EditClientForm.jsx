import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { handleSetValue } from "../utils/functions";
import { editClientAction } from "../../redux/clientDucks";
import { alertSuccessOffAction } from "../../redux/globalDucks";

const EditClientForm = ({ client, toggleEdit }) => {
  let { nombre, apellido, direccion, telefono, email: mail } = client;

  const [name, setName] = useState(nombre);
  const [lastname, setLastname] = useState(apellido);
  const [address, setAddress] = useState(direccion);
  const [phone, setPhone] = useState(telefono);
  const [email, setEmail] = useState(mail);

  // redux
  const dispatch = useDispatch();
  const spinnerOn = useSelector(store => store.global.spinnerOn);

  const handleEditSubmit = e => {
    e.preventDefault();
    let id = client._id;

    let body = {
      nombre: name,
      apellido: lastname,
      direccion: address,
      telefono: phone,
      email: mail
    };

    dispatch(editClientAction(id, body, toggleEdit));

    setTimeout(() => {
      dispatch(alertSuccessOffAction());
    }, 3000);
  };

  return (
    <div className="edit-form user-select-none">
      <Form onSubmit={handleEditSubmit}>
        <div className="d-flex justify-content-around">
          <div className="width40">
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                name="nombre"
                id="nombreIn"
                value={name}
                onChange={e => handleSetValue(setName, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input
                type="text"
                name="apellido"
                id="apellidoIn"
                value={lastname}
                onChange={e => handleSetValue(setLastname, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="direccion">Dirección</Label>
              <Input
                type="text"
                name="direccion"
                id="direccionIn"
                value={address}
                onChange={e => handleSetValue(setAddress, e)}
              />
            </FormGroup>
          </div>
          <div className="width40">
            <FormGroup>
              <Label for="telefono">Teléfono</Label>
              <Input
                type="text"
                name="telefono"
                id="telefonoIn"
                value={phone}
                onChange={e => handleSetValue(setPhone, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                style={{ fontWeight: "bold" }}
                type="email"
                name="email"
                id="emailIn"
                value={email}
                onChange={e => handleSetValue(setEmail, e)}
              />
            </FormGroup>
          </div>
        </div>

        <Spinner
          color="primary"
          style={{ marginLeft: "33rem" }}
          className={`${!spinnerOn ? "d-none" : ""}`}
        />
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
};

export default EditClientForm;
