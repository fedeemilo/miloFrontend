/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Modal,
  ModalBody,
  ModalHeader,
  Table
} from "reactstrap";
import {
  CreateForm,
  EditForm,
  NavBar,
  SpareForm,
  DeleteIcon,
  EditIcon
} from "../";
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
  const [searchValSpare, setSearchValSpare] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!searchValSpare) {
      const fetchRepuestos = async () => {
        try {
          let response = await axios.get(
            "http://localhost:8000/repuestos"
          );
          console.log(response);
          setRepuestos(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchRepuestos();
    }
  }, [searchValSpare]);

  const next = () => {
    if (animating) return;

    const nextIndex =
      activeIndex === repImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? repImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  console.log(repImages)

  const slides = repImages.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.url}
        className="d-flex justify-content-center"
      >
        <img src={item.url} alt="img" className="spare-img" />
      </CarouselItem>
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

  const handleDelete = e => {
    e.preventDefault();

    if (repuesto) {
      let id = repuesto._id;

      axios
        .delete(
          `https://milo-soft-backend.herokuapp.com/repuestos/${id}`
        )
        .then(() => setDeleteAlert(true))
        .catch(err => console.log(err));

      toggleDelete();
      setRepuestos(repuestos =>
        repuestos.filter(rep => rep._id !== id)
      );
    }
  };

  const handleImages = (e, rep) => {
    toggleImages();
    let images = rep.images;
    setRepImages(images);
  };

  const onEditDismiss = () => setEditAlert(false);

  const onDeleteDismiss = () => setDeleteAlert(false);

  return (
    <div className="components">
      <NavBar />

      {/* header */}
      <div className="components__header d-flex justify-content-between">
        <h3 className="ml-4 text-uppercase">Repuestos/Componentes</h3>
        <a href="#" onClick={toggleCreate} className="mr-3">
          <PlusIcon />
        </a>
      </div>

      {/* form */}
      <div className="components__form d-flex justify-content-between">
        <div className="col-lg-6 ml-4">
          <SpareForm
            repuestos={repuestos}
            setRepuestos={setRepuestos}
            setSearchValSpare={setSearchValSpare}
          />
        </div>
        {/* alert */}
        <div>
          <Alert
            color="success"
            isOpen={editAlert}
            toggle={onEditDismiss}
            fade={true}
            className="mt-5 mr-3"
            style={{ position: "relative", top: "5rem" }}
          >
            Componente editado con éxito!
          </Alert>
          <Alert
            color="danger"
            isOpen={deleteAlert}
            toggle={onDeleteDismiss}
            fade={true}
            className="mt-5 mr-3"
            style={{ position: "relative", top: "5rem" }}
          >
            Componente eliminado con éxito!
          </Alert>
        </div>
      </div>

      {/* table of spare-parts */}
      <div className="components__table mt-5 mx-auto p-2">
        <Table dark bordered hover className="text-center">
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
                    ? rep.descripcion
                    : "(Sin Descripción)"}
                </td>
                <td>{rep.cantidad}</td>
                <td>{rep.ubicacion.toUpperCase()}</td>
                <td>
                  {rep.images.length > 0 ? (
                    <a href="#" onClick={e => handleImages(e, rep)}>
                      Ver Imágenes
                    </a>
                  ) : (
                    <p>(Sin imágenes)</p>
                  )}
                </td>
                <td>datasheet</td>
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
            ))}
          </tbody>
        </Table>
      </div>

      {/* modal for edition */}
      <div>
        <Modal isOpen={modalEdit} toggleEdit={toggleEdit}>
          <ModalHeader toggleEdit={toggleEdit}>
            Editar Repuesto/Componente
          </ModalHeader>
          <ModalBody>
            <EditForm
              spare={spareEdit}
              toggleEdit={toggleEdit}
              setEditAlert={setEditAlert}
            />
          </ModalBody>
        </Modal>
      </div>

      {/* modal for deletion */}
      <div>
        <Modal isOpen={modalDelete} toggleDelete={toggleDelete}>
          <ModalHeader toggleDelete={toggleDelete}>
            ¿Deseas eliminar este componente?
          </ModalHeader>
          <ModalBody>
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
        <Modal isOpen={modalCreate} toggleCreate={toggleCreate}>
          <ModalHeader toggleCreate={toggleCreate}>
            Crear Nuevo Repuesto/Componente
          </ModalHeader>

          <ModalBody>
            <CreateForm toggleCreate={toggleCreate} />
          </ModalBody>
        </Modal>
      </div>

      {/* modal for pictures */}
      <div>
        <Modal isOpen={modalImages} toggle={toggleImages}>
          <ModalHeader toggle={toggleImages}>
            Imágenes del Repuesto/Componente
          </ModalHeader>
          <ModalBody className="mx-auto">
            {repImages && (
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators
                  items={repImages}
                  activeIndex={activeIndex}
                  onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                  direction="prev"
                  directionText="Previous"
                  onClickHandler={previous}
                />
                <CarouselControl
                  direction="next"
                  directionText="Next"
                  onClickHandler={next}
                />
              </Carousel>
            )}
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default SpareParts;
