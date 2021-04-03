import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { __db__ } from "../../constants";
import ImageBox from "../utils/ImageBox";

function EditForm({ spare, toggleEdit, setEditAlert, setRepuestos }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quant, setQuant] = useState(0);
  const [loc, setLoc] = useState("");
  const [images, setImages] = useState([]);
  const [datasheet, setDatasheet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelDS, setCancelDS] = useState(false);
  const [arrCancelImgs, setArrCancelImgs] = useState([]);
  const [hideDelImgs, setHideDelImgs] = useState(false)

  const handleEditName = e => {
    setName(e.target.value);
  };

  const handleEditDesc = e => {
    setDesc(e.target.value);
  };

  const handleEditQuant = e => {
    setQuant(e.target.value);
  };

  const handleEditLocation = e => {
    setLoc(e.target.value);
  };

  const handleCreateDatasheet = e => {
    let datasheets = e.target.files;
    let datasheetsArray = [];

    console.log(datasheets);

    Array.from(datasheets).forEach(datasheet => {
      datasheetsArray.push(datasheet);
    });

    setDatasheet(datasheetsArray);
  };

  const handleCreateImages = e => {
    let imgs = e.target.files;
    let imgsArray = [];

    console.log(imgs);

    Array.from(imgs).forEach(img => {
      imgsArray.push(img);
    });

    setImages(imgsArray);
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    let id = spare._id;
    let fData = new FormData();

    let body = {
      nombre: name,
      descripcion: desc,
      cantidad: quant,
      ubicacion: loc,
      deleteImages: arrCancelImgs
    };

    for (let key in body) {
      fData.append(key, body[key]);
    }

    images.forEach(img => {
      fData.append("images", JSON.stringify(img));
    });

    datasheet.forEach(sheet => {
      fData.append("datasheet", sheet);
    });

    try {
      setLoading(true);
      let {
        data: { repuesto }
      } = await axios.put(`${__db__}/repuestos/${id}`, fData);

      if (repuesto) {
        setLoading(false);
        setRepuestos(repuestos =>
          repuestos.map(rep => {
            if (rep._id === id) {
              return Object.assign({}, rep, repuesto);
            }
            return rep;
          })
        );
    setEditAlert(true);
    setTimeout(() => {
      setEditAlert(false);
    }, 5000);

      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    toggleEdit();
    
  };

  useEffect(() => {
    if (spare) {
      setName(spare.nombre);
      setDesc(spare.descripcion);
      setQuant(spare.cantidad);
      setLoc(spare.ubicacion);
      setImages(spare.images);
      setDatasheet(spare.datasheet);
    }

    if (spare.images.length > 0) {
      setHideDelImgs(true)

    }

  }, [spare]);

  return (
    <div className='edit-form'>
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
          </div>
          <div>
            <div className="d-flex flex-column">
              <p
                className={`font-sm mb-1 ${
                  images.length > 0 && hideDelImgs ? "" : "d-none"
                }`}
              >
                *Selecciona las <strong>imágenes</strong> que deseas
                borrar{" "}
                {`${
                  arrCancelImgs.length > 0 && hideDelImgs
                    ? `(${arrCancelImgs.length})`
                    : ""
                }`}
              </p>
              <div className="d-flex">
                {images.length > 0 && hideDelImgs &&
                  images.map(img => (
                    <ImageBox
                      img={img}
                      arrCancelImgs={arrCancelImgs}
                      setArrCancelImgs={setArrCancelImgs}
                    />
                  ))}
              </div>
            </div>
            <FormGroup className="mt-3">
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
          </div>
        </div>

        <Spinner
          color="primary"
          style={{ marginLeft: "15rem" }}
          className={`${!loading ? "d-none" : ""}`}
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
}

export default EditForm;
