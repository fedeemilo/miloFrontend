/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  Spinner,
  Table,
  Tooltip
} from "reactstrap";

import Carousel from "react-bootstrap/Carousel";

import {
  CreateForm,
  EditForm,
  NavBar,
  SpareForm,
  DeleteIcon,
  EditIcon
} from "../";
import { __db__ } from "../../constants";
import PlusIcon from "../utils/PlusIcon";

function SpareParts() {
  const [repuesto, setRepuesto] = useState({});
  const [repuestos, setRepuestos] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalImages, setModalImages] = useState(false);
  const [repImages, setRepImages] = useState([]);
  const [spareEdit, setSpareEdit] = useState({});
  const [editAlert, setEditAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [createAlert, setCreateAlert] = useState(false);
  const [searchValSpare, setSearchValSpare] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [cloneRepuestos, setCloneRepuestos] = useState([]);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (!searchValSpare) {
      const fetchRepuestos = async () => {
        try {
          let response = await axios.get(`${__db__}/repuestos`);
          let cloneResponse = [...response.data];
          setRepuestos(response.data);
          setCloneRepuestos(cloneResponse);
        } catch (error) {
          console.log(error);
        }
      };

      fetchRepuestos();
    }
  }, [searchValSpare]);

  const slides = repImages.map(item => {
    return (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={item.src}
          alt={item.altText}
        />
      </Carousel.Item>
    );
  });

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
    setRepuestos(repuestos => [...repuestos]);
  };

  const toggleImages = () => {
    setModalImages(!modalImages);
  };

  const toggleDelete = rep => {
    setModalDelete(!modalDelete);

    if (rep) {
      setRepuesto(rep);
    }
  };

  const toggleCreate = () => {
    setModalCreate(!modalCreate);
  };

  const handleEdit = (e, rep) => {
    e.preventDefault();
    toggleEdit();
    setSpareEdit(rep);
    onEditDismiss();
  };

  const handleDelete = async e => {
    e.preventDefault();

    if (repuesto) {
      let id = repuesto._id;

      try {
        let response = await axios.delete(
          `${__db__}/repuestos/${id}`
        );

        setDeleteAlert(true);
      } catch (error) {
        console.log(error);
      }

      toggleDelete();
      setTimeout(() => {
        setDeleteAlert(false);
      }, 5000);
      setRepuestos(repuestos =>
        repuestos.filter(rep => rep._id !== id)
      );
    }
  };

  const handleImages = (e, rep) => {
    toggleImages();
    let images = rep.images;

    let newImages = images.map((img, i) => {
      return {
        src: img.url,
        altText: `img-${i}`,
        caption: rep.nombre
      };
    });

    setRepImages(newImages);
  };

  const onEditDismiss = () => setEditAlert(false);

  const onCreateDismiss = () => setCreateAlert(false);

  const onDeleteDismiss = () => setDeleteAlert(false);


  return (
    <div className="components">
      <NavBar />

      {/* header */}
      <div className="mt-5 components__header d-flex justify-content-center">
        <h3 className="ml-4 text-uppercase text-center">
          Repuestos | Componentes
        </h3>
        <a
          id="TooltipPlusIcon"
          href="#"
          onClick={toggleCreate}
          className="mr-3 position-absolute"
          style={{ left: ".5rem" }}
        >
          <PlusIcon />
        </a>
        <Tooltip
          placement="right"
          isOpen={tooltipOpen}
          target="TooltipPlusIcon"
          toggle={toggle}
        >
          Crear nuevo
        </Tooltip>
      </div>

      {/* form */}
      <div className="components__form d-flex flex-column justify-content-center align-items-center">
        <div className="col-lg-6 ml-4 text-center">
          <SpareForm
            setRepuestos={setRepuestos}
            setSearchValSpare={setSearchValSpare}
            cloneRepuestos={cloneRepuestos}
          />
        </div>
        {/* alert */}
        <div className="d-flex">
          {/* success alert */}
          <Alert
            color="success"
            isOpen={createAlert}
            toggle={onCreateDismiss}
            fade={true}
            className="mt-5 mr-3"
            style={{
              position: "absolute",
              top: "15rem",
              left: "1rem"
            }}
          >
            Componente creado con éxito!
          </Alert>

          <Alert
            color="success"
            style={{
              position: "absolute",
              top: "15rem",
              left: "1rem"
            }}
            isOpen={editAlert}
            toggle={onEditDismiss}
            fade={true}
            className="mt-5 mr-3"
          >
            Componente editado con éxito!
          </Alert>

          {/* repuesto delete alert */}
          <Alert
            color="danger"
            isOpen={deleteAlert}
            toggle={onDeleteDismiss}
            fade={true}
            className="mt-5 mr-3"
            style={{
              position: "absolute",
              top: "15rem",
              left: "1rem"
            }}
          >
            Componente eliminado con éxito!
          </Alert>
        </div>
      </div>

      {/* table of spare-parts */}
      <div className="components__table mt-4 mx-auto p-2">
        <Table dark bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Ubicación</th>
              <th>Imágenes</th>
              <th>Datasheet</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {repuestos.map((rep, i) => (
              <tr key={rep._id}>
                <th scope="row">{i + 1}</th>
                <td>{rep.nombre.toUpperCase()}</td>
                <td>
                  {rep.descripcion
                    ? rep.descripcion.toUpperCase()
                    : "(Sin Descripción)"}
                </td>
                <td>{rep.cantidad}</td>
                <td>{rep.ubicacion.toUpperCase()}</td>
                <td>
                  {rep.images.length > 0 ? (
                    <a href="#" onClick={e => handleImages(e, rep)}>
                      Ver Imágenes {`(${rep.images.length})`}
                    </a>
                  ) : (
                    <p>(Sin imágenes)</p>
                  )}
                </td>
                <td>
                  {rep.datasheet && rep.datasheet.length > 0 ? (
                    <a
                      href={rep.datasheet[0].url}
                      download={rep.nombre}
                      target="__blank"
                    >
                      Descargar
                    </a>
                  ) : (
                    <p>(Sin datasheet)</p>
                  )}
                </td>
                <td className="">
                  {/* edit */}
                  <a
                    href="#"
                    className="ion-edit no-dec"
                    onClick={e => handleEdit(e, rep)}
                  >
                    <EditIcon />
                  </a>
                  {/* delete */}
                  <a
                    href="#"
                    className="ion-delete no-dec ml-3"
                    onClick={() => toggleDelete(rep)}
                  >
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
            )) || (
              <tr>
                {[...Array(8).keys()].map(n => (
                  <td>
                    <Spinner color="light" size="lg" />
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* modal for edition */}
      <div>
        <Modal size="lg" isOpen={modalEdit} toggleEdit={toggleEdit}>
          <div className="d-flex justify-content-center">
            <h3 className="mx-auto pt-3">
              Editar Repuesto | Componente
            </h3>
          </div>

          <hr className="mx-2 mt-1" />

          <ModalBody>
            <EditForm
              spare={spareEdit}
              toggleEdit={toggleEdit}
              setEditAlert={setEditAlert}
              repuestos={repuestos}
              setRepuestos={setRepuestos}
            />
          </ModalBody>
        </Modal>
      </div>

      {/* modal for deletion */}
      <div>
        <Modal isOpen={modalDelete} toggleDelete={toggleDelete}>
          <h4 className="fweight800 text-center pt-3">
            ¿Deseas eliminar este componente?
          </h4>
          <div className="text-center">
            {repuesto && repuesto.nombre}
          </div>
          <ModalBody className="d-flex justify-content-center">
            <Button
              color="primary"
              className="mr-2"
              onClick={handleDelete}
            >
              Aceptar
            </Button>
            <Button color="danger" onClick={toggleDelete}>
              Cancelar
            </Button>
          </ModalBody>
        </Modal>
      </div>

      {/* modal for creation */}
      <div>
        <Modal
          size="lg"
          isOpen={modalCreate}
          toggleCreate={toggleCreate}
        >
          <div className="d-flex justify-content-center">
            <h3 className="pt-3 fweight800">
              Crear Nuevo Repuesto | Componente
            </h3>
          </div>

          <hr className="mx-2 mt-1" />
          <ModalBody>
            <CreateForm
              toggleCreate={toggleCreate}
              repuestos={repuestos}
              setRepuestos={setRepuestos}
              setCreateAlert={setCreateAlert}
            />
          </ModalBody>
        </Modal>
      </div>

      {/* modal for pictures */}
      <div>
        <Modal size="lg" isOpen={modalImages} toggle={toggleImages}>
          <div className="d-flex justify-content-center">
            <h3 className="pt-3 fweight800">
              Imágenes del Repuesto | Componente
            </h3>
          </div>
          <ModalBody className="mx-auto">
            {repImages && (
              <Carousel
                interval={null}
                activeIndex={index}
                onSelect={handleSelect}
              >
                {slides}
              </Carousel>
            )}
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default SpareParts;
