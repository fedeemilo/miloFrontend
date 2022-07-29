import axios from "axios";
import { filterArrBox } from "../components/utils/functions";
import { __db__ } from "../constants";
import {
    alertSuccessOnAction,
    alertOnErrorAction,
    spinnerOffAction,
    spinnerOnAction,
    alertDeleteOnAction
} from "./globalDucks";
import isEmpty from "lodash/isEmpty";

// constants
const initialData = {
    sparesArr: [],
    sparesAux: []
};

// types
const GET_SPARES_DATA = "GET_SPARES_DATA";
const CREATE_NEW_SPARE = "CREATE_NEW_SPARE";
const UPDATE_SPARES = "UPDATE_SPARES";
const EDIT_SPARE = "EDIT_SPARE";
const DELETE_SPARE = "DELETE_SPARE";

// reducer
export default function sparesReducer(state = initialData, action) {
    switch (action.type) {
        case GET_SPARES_DATA:
            return {
                ...state,
                sparesArr: action.payload,
                sparesAux: action.payload
            };
        case CREATE_NEW_SPARE:
            return { ...state, sparesArr: action.payload };
        case UPDATE_SPARES:
            return { ...state, sparesArr: action.payload };
        case EDIT_SPARE:
            return { ...state, sparesArr: action.payload };
        case DELETE_SPARE:
            return {
                ...state,
                sparesArr: action.payload,
                sparesAux: action.payload
            };
        default:
            return state;
    }
}

// actions

// get spares
export const getSparesAction = () => async dispatch => {
    try {
        const res = await axios.get(`${__db__}/repuestos`);

        dispatch({
            type: GET_SPARES_DATA,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};

// create
export const createNewSpareAction =
    (data, toggleCreate) => async (dispatch, getState) => {
        try {
            dispatch(spinnerOnAction());
            const res = await axios.post(`${__db__}/repuestos`, data);

            if (res.data) {
                const { repuesto } = res.data;
                const sparesArr = getState().spares.sparesArr;

                dispatch(spinnerOffAction());
                dispatch({
                    type: CREATE_NEW_SPARE,
                    payload: [...sparesArr, repuesto]
                });
                dispatch(alertSuccessOnAction("Componente creado con éxito!"));
                toggleCreate();
            }
        } catch (error) {
            const {
                response: {
                    data: {
                        err: {
                            errors: {
                                nombre: { message }
                            }
                        }
                    }
                }
            } = error;

            dispatch(alertOnErrorAction(message));
            dispatch(spinnerOffAction());
            toggleCreate();
        }
    };

// update
export const updateSparesAction =
    (searchVal, filterElem) => (dispatch, getState) => {
        const arrAux = getState().spares.sparesAux;
        if (searchVal.length > 0) {
            const newSparesArr = filterArrBox(arrAux, filterElem, searchVal);

            if (isEmpty(newSparesArr)) return;
            
            dispatch({
                type: UPDATE_SPARES,
                payload: newSparesArr
            });
        } else {
            dispatch(getSparesAction());
        }
    };

// edit
export const editSpareAction =
    (id, body, toggleEdit) => async (dispatch, getState) => {
        try {
            dispatch(spinnerOnAction());
            const {
                data: { repuesto }
            } = await axios.put(`${__db__}/repuestos/${id}`, body);

            if (repuesto) {
                const sparesArr = getState().spares.sparesArr;
                const filtered = sparesArr.filter(spare => spare._id !== id);

                dispatch(spinnerOffAction());
                dispatch({
                    type: EDIT_SPARE,
                    payload: [...filtered, repuesto]
                });

                dispatch(alertSuccessOnAction("Componente editado con éxito!"));
                toggleEdit();
            }
        } catch (error) {
            const {
                response: {
                    data: {
                        err: {
                            errors: {
                                nombre: { message }
                            }
                        }
                    }
                }
            } = error;

            dispatch(alertOnErrorAction(message));
            dispatch(spinnerOffAction());
            toggleEdit();
        }
    };

// delete
export const deleteSpareAction = id => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`${__db__}/repuestos/${id}`);

        const arrSpares = getState().spares.sparesArr;

        const newArr = arrSpares.filter(spare => spare._id !== id);

        if (res.data) {
            dispatch({
                type: DELETE_SPARE,
                payload: newArr
            });

            dispatch(alertDeleteOnAction());
        }
    } catch (err) {
        console.log(err);
    }
};
