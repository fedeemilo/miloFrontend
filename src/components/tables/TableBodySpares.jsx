/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Suspense } from "react";
import { Modal, ModalBody } from "reactstrap";
import { __db__ } from "../../constants";
import EditSpareForm from "../forms/EditSpareForm";
import DeleteIcon from "../utils/DeleteIcon";
import EditIcon from "../utils/EditIcon";
import { useSelector, useDispatch } from "react-redux";
import { deleteSpareAction } from "../../redux/spareDucks";
import {
  alertDeleteOffAction,
  alertOffErrorAction,
  spinnerOffAction
} from "../../redux/globalDucks";

const TableBodySpares = ({ repuesto, setRepuesto }) => {
  // redux
  const dispatch = useDispatch();
  const sparesRedux = useSelector(store => store.spares.sparesArr);

  // spares
  const [spares, setSpares] = useState([]);

  // edit
  const [spareEdit, setSpareEdit] = useState({});
  const [modalEdit, setModalEdit] = useState(false);

  const handleEdit = (e, rep) => {
    e.preventDefault(); 
    toggleEdit();
    setSpareEdit(rep);
    dispatch(alertOffErrorAction());
  };

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
    dispatch(spinnerOffAction());
  };

  // delete
  const ModalDelete = React.lazy(() =>
    import("../modals/ModalDelete")
  );
  const [modalDelete, setModalDelete] = useState(false);

  const handleDelete = async e => {
    e.preventDefault();

    if (repuesto) {
      let id = repuesto._id;

      dispatch(deleteSpareAction(id));

      toggleDelete();
      setTimeout(() => {
        dispatch(alertDeleteOffAction());
      }, 5000);
    }
  };

  const toggleDelete = rep => {
    setModalDelete(!modalDelete);

    if (rep) {
      setRepuesto(rep);
    }
  };

  // images
  const ModalPictures = React.lazy(() =>
    import("../modals/ModalPictures")
  );
  const [modalImages, setModalImages] = useState(false);
  const [repImages, setRepImages] = useState([]);

  const toggleImages = () => {
    setModalImages(!modalImages);
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

  useEffect(() => {
    setSpares(sparesRedux);
  }, [sparesRedux]);

  return (
    <>
      <tbody>
        {spares.length > 0 &&
          spares.map((elem, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{elem.nombre && elem.nombre.toUpperCase()}</td>
              <td>
                {elem.descripcion
                  ? elem.descripcion.toUpperCase()
                  : "(Sin Descripción)"}
              </td>
              <td>{elem.cantidad}</td>
              <td>
                {elem.ubicacion && elem.ubicacion.toUpperCase()}
              </td>
              <td>
                {elem.images && elem.images.length > 0 ? (
                  <a href="#" onClick={e => handleImages(e, elem)}>
                    Ver Imágenes {`(${elem.images.length})`}
                  </a>
                ) : (
                  <div className="no-images">(Sin imágenes)</div>
                )}
              </td>
              <td>
                {elem.datasheet && elem.datasheet.length > 0 ? (
                  <a
                    href={elem.datasheet[0].url}
                    download={elem.nombre}
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
                  onClick={e => handleEdit(e, elem)}
                >
                  <EditIcon />
                </a>
                {/* delete */}
                <a
                  href="#"
                  className="ion-delete no-dec ml-3"
                  onClick={() => toggleDelete(elem)}
                >
                  <DeleteIcon />
                </a>
              </td>
            </tr>
          ))}
      </tbody>

      {/* modal for pictures */}

      <Suspense fallback={<div>Loading...</div>}>
        <ModalPictures
          modalImages={modalImages}
          toggleImages={toggleImages}
          repImages={repImages}
        />
      </Suspense>

      {/* modal for edition */}
      <div>
        <Modal size="lg" isOpen={modalEdit} toggleEdit={toggleEdit}>
          <div className="d-flex justify-content-center user-select-none">
            <h3 className="mx-auto pt-3">
              Editar Repuesto | Componente
            </h3>
          </div>

          <hr className="mx-2 mt-1" />

          <ModalBody>
            <EditSpareForm
              spare={spareEdit}
              toggleEdit={toggleEdit}
            />
          </ModalBody>
        </Modal>
      </div>

      {/* modal for deletion */}
      <Suspense fallback={<div>Loading...</div>}>
        <ModalDelete
          item={repuesto}
          modalDelete={modalDelete}
          toggleDelete={toggleDelete}
          handleDelete={handleDelete}
        />
      </Suspense>
    </>
  );
};

export default TableBodySpares;
