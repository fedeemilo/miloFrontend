import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { __db__ } from "../../constants";
import {
  handleSetMultimedia,
  handleSetValue
} from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { createNewSpareAction } from "../../redux/spareDucks";
import { alertSuccessOffAction } from "../../redux/globalDucks";

const CreateSpareForm = ({ toggleCreate }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [images, setImages] = useState([]);
  const [datasheet, setDatasheet] = useState([]);
  const [quant, setQuant] = useState(0);

  // redux
  const dispatch = useDispatch();
  const spinnerOn = useSelector(store => store.global.spinnerOn);

  const handleCreateSubmit = async e => {
    e.preventDefault();

    let fData = new FormData();

    let body = {
      nombre: name,
      descripcion: desc,
      cantidad: quant,
      ubicacion: loc
    };

    for (let key in body) {
      fData.append(key, body[key]);
    }

    images.forEach(img => {
      fData.append("images", img);
    });

    datasheet.forEach(sheet => {
      fData.append("datasheet", sheet);
    });

    dispatch(createNewSpareAction(fData, toggleCreate));

    setTimeout(() => {
      dispatch(alertSuccessOffAction());
    }, 3000);
  };

  return (
    <div className="edit-form user-select-none">
      <Form
        onSubmit={handleCreateSubmit}
        encType="multipart/form-data"
      >
        <div className="d-flex justify-content-around">
          <div className="width40">
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                name="nombre"
                id="nombreIn"
                placeholder="Escribe el nombre..."
                onChange={e => handleSetValue(setName, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="descripcion">Descripción</Label>
              <Input
                type="text"
                name="descripcion"
                id="descripcionIn"
                placeholder="Escribe la descripción..."
                onChange={e => handleSetValue(setDesc, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cantidad">Cantidad</Label>
              <Input
                type="number"
                name="cantidad"
                id="cantidadIn"
                placeholder="Escribe la cantidad..."
                onChange={e => handleSetValue(setQuant, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ubicacion">Ubicación</Label>
              <Input
                type="text"
                name="ubicacion"
                id="ubicacionIn"
                placeholder="Escribe la ubicación..."
                onChange={e => handleSetValue(setLoc, e)}
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <Label for="images">Imágenes</Label>
              <Input
                type="file"
                name="images"
                id="imagesIn"
                onChange={e => handleSetMultimedia(setImages, e)}
                multiple
              />
            </FormGroup>
            <FormGroup>
              <Label for="datasheet">Datasheet</Label>
              <Input
                type="file"
                name="datasheet"
                id="datasheetIn"
                onChange={e => handleSetMultimedia(setDatasheet, e)}
                multiple
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

export default CreateSpareForm;
