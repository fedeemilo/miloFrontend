/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { __db__, __prod__ } from "../../constants";

function CreateForm({ toggleCreate, setRepuestos, setCreateAlert }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [images, setImages] = useState([]);
  const [datasheet, setDatasheet] = useState([]);
  const [quant, setQuant] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreateName = e => {
    setName(e.target.value);
  };

  const handleCreateDesc = e => {
    setDesc(e.target.value);
  };

  const handleCreateQuant = e => {
    setQuant(e.target.value);
  };

  const handleCreateLocation = e => {
    setLoc(e.target.value);
  };

  const handleCreateImages = e => {
    let imgs = e.target.files;
    let imgsArray = [];

    Array.from(imgs).forEach(img => {
      imgsArray.push(img);
    });

    setImages(imgsArray);
  };

  const handleCreateDatasheet = e => {
    let datasheets = e.target.files;
    let datasheetsArray = [];

    Array.from(datasheets).forEach(datasheet => {
      datasheetsArray.push(datasheet);
    });

    setDatasheet(datasheetsArray);
  };

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

    try {
      setLoading(true);
      let {
        data: { repuesto }
      } = await axios.post(`${__db__}/repuestos`, fData);

      if (repuesto) {
        setLoading(false);
        setRepuestos(repuestos => [...repuestos, repuesto]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    toggleCreate();
    setCreateAlert(true);
  };

  return (
    <div>
      <Form
        onSubmit={handleCreateSubmit}
        encType="multipart/form-data"
      >
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
        <FormGroup>
          <Label for="images">Imágenes</Label>
          <Input
            type="file"
            name="images"
            id="imagesIn"
            onChange={handleCreateImages}
            multiple
          />
        </FormGroup>
        <FormGroup>
          <Label for="datasheet">Datasheet</Label>
          <Input
            type="file"
            name="datasheet"
            id="datasheetIn"
            onChange={handleCreateDatasheet}
            multiple
          />
        </FormGroup>
        <Spinner
          color="primary"
          style={{ marginLeft: "15rem" }}
          className={`${!loading ? "d-none" : ""}`}
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
}

export default CreateForm;
