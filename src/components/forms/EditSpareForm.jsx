import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner
} from "reactstrap";
import ButtonRB from "react-bootstrap/Button";
import { __db__ } from "../../constants";
import ImageBox from "../utils/ImageBox";
import { editSpareAction } from "../../redux/spareDucks";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSetFiles,
  handleSetMultimedia,
  handleSetValue
} from "../utils/functions";
import { alertSuccessOffAction } from "../../redux/globalDucks";

const EditSpareForm = ({ spare, toggleEdit }) => {
  let {
    nombre,
    descripcion,
    cantidad,
    ubicacion,
    images: imgs,
    datasheet: datash
  } = spare;

  const [name, setName] = useState(nombre);
  const [desc, setDesc] = useState(descripcion);
  const [quant, setQuant] = useState(cantidad);
  const [loc, setLoc] = useState(ubicacion);
  const [images, setImages] = useState(imgs);
  const [auxImages] = useState(imgs);
  const [datasheet, setDatasheet] = useState(datash);
  const [arrCancelImgs, setArrCancelImgs] = useState([]);
  const [arrCancelDS, setArrayCancelDS] = useState([]);
  const [hideDelImgs, setHideDelImgs] = useState(false);
  const [hideDelDS, setHideDelDS] = useState(false);

  const dispatch = useDispatch();
  const spinnerOn = useSelector(store => store.global.spinnerOn);

  const handleEditSubmit = async e => {
    e.preventDefault();
    let id = spare._id;
    let fData = new FormData();

    let body = {
      nombre: name,
      descripcion: desc,
      cantidad: quant,
      ubicacion: loc,
      deleteImages: arrCancelImgs,
      deleteDatasheet: arrCancelDS
    };

    for (let key in body) {
      fData.append(key, body[key]);
    }

    images.forEach(img => {
      fData.append("images", img);
    });

    if (datasheet) {
      fData.append("datasheet", datasheet[0]);
    }

    dispatch(editSpareAction(id, fData, toggleEdit));

    setTimeout(() => {
      dispatch(alertSuccessOffAction());
    }, 3000);
  };

  const handleDelDS = () => {
    let publicId = datasheet[0].public_id;
    setArrayCancelDS(arrCancelDS => arrCancelDS.concat(publicId));
    setHideDelDS(!hideDelDS);
  };

  useEffect(() => {
    if (spare.images && spare.images.length > 0) {
      setHideDelImgs(true);
    }

    if (spare.datasheet && spare.datasheet.length > 0) {
      setHideDelDS(true);
    }
  }, [spare]);

  return (
    <div className="edit-form">
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
              <Label for="descripcion">Descripción</Label>
              <Input
                type="text"
                name="descripcion"
                id="descripcionIn"
                value={desc}
                onChange={e => handleSetValue(setDesc, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cantidad">Cantidad</Label>
              <Input
                type="number"
                name="cantidad"
                id="cantidadIn"
                value={quant}
                onChange={e => handleSetValue(setQuant, e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ubicacion">Ubicación</Label>
              <Input
                type="text"
                name="ubicacion"
                id="ubicacionIn"
                value={loc}
                onChange={e => handleSetValue(setLoc, e)}
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
                borrar
              </p>
              <div className="d-flex">
                {auxImages.length > 0 &&
                  hideDelImgs &&
                  auxImages.map(img => (
                    <ImageBox
                      img={img}
                      setArrCancelImgs={setArrCancelImgs}
                    />
                  ))}
              </div>
            </div>
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
            <div className="d-flex flex-column">
              {hideDelDS ? (
                <ButtonRB
                  variant="danger"
                  className="mt-2"
                  onClick={handleDelDS}
                >
                  Eliminar Datasheet de{" "}
                  <strong>{name.toUpperCase()}</strong>
                </ButtonRB>
              ) : (
                <FormGroup className="mt-1">
                  <Label for="datasheet">Datasheet</Label>
                  <Input
                    type="file"
                    name="datasheet"
                    id="datasheetIn"
                    onChange={e => handleSetFiles(setDatasheet, e)}
                    multiple
                  />
                </FormGroup>
              )}
            </div>
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

export default EditSpareForm;
