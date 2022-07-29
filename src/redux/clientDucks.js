// constants
import axios from "axios";
import { __db__ } from "../constants";
import {
    alertDeleteOnAction,
    alertSuccessOnAction,
    spinnerOffAction,
    spinnerOnAction
} from "./globalDucks";

const initialData = {
    clientsArr: []
};

// types
const GET_CLIENTS_DATA = "GET_CLIENTS_DATA";
const CREATE_NEW_CLIENT = "CREATE_NEW_CLIENT";
const UPDATE_CLIENTS = "UPDATE_CLIENTS";
const EDIT_CLIENT = "EDIT_CLIENT";
const DELETE_CLIENT = "DELETE_CLIENT";

// reducer
export default function clientsReducer(state = initialData, action) {
    switch (action.type) {
        case GET_CLIENTS_DATA:
            return {
                ...state,
                clientsArr: action.payload
            };
        case CREATE_NEW_CLIENT:
            return {
                ...state,
                clientsArr: [...state.clientsArr, action.payload]
            };
        case UPDATE_CLIENTS: {
            let { filterElem, searchVal } = action.payload;

            let cloneArr = [...state.clientsArr].filter(client =>
                client[filterElem].toString().toLowerCase().includes(searchVal)
            );

            return {
                ...state,
                clientsArr: cloneArr
            };
        }
        case EDIT_CLIENT:
            return { ...state, clientsArr: action.payload };
        case DELETE_CLIENT:
            return {
                ...state,
                clientsArr: action.payload
            };
        default:
            return state;
    }
}

// actions
export const getClientsAction = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${__db__}/clientes`);

        dispatch({
            type: GET_CLIENTS_DATA,
            payload: data
        });
    } catch (err) {
        console.log(err);
    }
};

// create
export const createNewClientAction =
    (data, toggleCreate) => async (dispatch, getState) => {
        try {
            dispatch(spinnerOnAction());

            let res = await axios.post(`${__db__}/clientes`, data);

            if (res.data) {
                let { cliente } = res.data;

                dispatch(spinnerOffAction());
                dispatch({
                    type: CREATE_NEW_CLIENT,
                    payload: cliente
                });

                dispatch(alertSuccessOnAction("Cliente creado con éxito!"));
                toggleCreate();
            }
        } catch (err) {
            console.log(err);
            toggleCreate();
        }
    };

// update
export const updateClientsAction =
    (searchVal, filterElem) => (dispatch, getState) => {
        dispatch({
            type: UPDATE_CLIENTS,
            payload: { searchVal, filterElem }
        });
    };

// edit
export const editClientAction =
    (id, body, toggleEdit) => async (dispatch, getState) => {
        try {
            dispatch(spinnerOnAction());

            let {
                data: { cliente }
            } = await axios.put(`${__db__}/clientes/${id}`, body);

            if (cliente) {
                let clientsArr = getState().clients.clientsArr;
                let filtered = clientsArr.filter(client => client._id !== id);

                dispatch(spinnerOffAction());
                dispatch({
                    type: EDIT_CLIENT,
                    payload: [...filtered, cliente]
                });

                dispatch(alertSuccessOnAction("Cliente editado con éxito!"));
                toggleEdit();
            }
        } catch (error) {
            console.log(error);
        }
    };

// delete
export const deleteClientAction = id => async (dispatch, getState) => {
    try {
        let res = await axios.delete(`${__db__}/clientes/${id}`);

        let arrClients = getState().clients.clientsArr;

        let newArr = arrClients.filter(client => client._id !== id);

        if (res.data) {
            dispatch({
                type: DELETE_CLIENT,
                payload: newArr
            });

            dispatch(alertDeleteOnAction());
        }
    } catch (error) {
        console.log(error);
    }
};
