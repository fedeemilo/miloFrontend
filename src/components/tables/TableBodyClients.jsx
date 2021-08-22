/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, Suspense } from "react";
import { __db__ } from "../../constants";
import EditIcon from "../utils/EditIcon";
import DeleteIcon from "../utils/DeleteIcon";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeString } from "../utils/functions";
import { Modal, ModalBody } from "reactstrap";
import EditClientForm from "../forms/EditClientForm";
import {
  alertDeleteOffAction,
  alertOffErrorAction
} from "../../redux/globalDucks";
import { deleteClientAction } from "../../redux/clientDucks";

const TableBodyClients = ({ cliente, setCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [clientEdit, setClientEdit] = useState({});
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const ModalDelete = React.lazy(() =>
    import("../modals/ModalDelete")
  );

  // redux
  const dispatch = useDispatch();
  const clientsRedux = useSelector(store => store.clients.clientsArr);

  const handleEdit = (e, client) => {
    e.preventDefault();
    toggleEdit();
    setClientEdit(client);
    dispatch(alertOffErrorAction());
  };

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
    setClientes(clientes => [...clientes]);
  };

  const handleDelete = async e => {
    e.preventDefault();

    if (cliente) {
      let id = cliente._id;

      dispatch(deleteClientAction(id));

      toggleDelete();
      setTimeout(() => {
        dispatch(alertDeleteOffAction());
      }, 5000);
    }
  };

  const toggleDelete = cli => {
    setModalDelete(!modalDelete);

    if (cli) {
      setCliente(cli);
    }
  };

  useEffect(() => {
    setClientes(clientsRedux);
  }, [clientsRedux]);

  return (
    <>
      <tbody>
        {clientes &&
          clientes.map((elem, i) => (
            <tr key={elem._id}>
              <th scope="row">{i + 1}</th>
              <td>{capitalizeString(elem.nombre)}</td>
              <td>{capitalizeString(elem.apellido)}</td>
              <td>{elem.direccion}</td>
              <td>{elem.telefono}</td>
              <td>{elem.email}</td>
              <td style={{ width: "21rem" }}>{elem.observaciones}</td>
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

      {/* modal for edition */}
      <div className="user-select-none">
        <Modal size="lg" isOpen={modalEdit} toggleEdit={toggleEdit}>
          <div className="d-flex justify-content-center ">
            <h3 className="mx-auto pt-3 user-select-none">
              Editar Cliente
            </h3>
          </div>

          <hr className="mx-2 mt-1" />

          <ModalBody>
            <EditClientForm
              client={clientEdit}
              toggleEdit={toggleEdit}
            />
          </ModalBody>
        </Modal>
      </div>

      {/* modal for deletion */}
      <Suspense fallback={<div>Loading...</div>}>
        <ModalDelete
          item={cliente}
          modalDelete={modalDelete}
          toggleDelete={toggleDelete}
          handleDelete={handleDelete}
        />
      </Suspense>
    </>
  );
};

export default TableBodyClients;
