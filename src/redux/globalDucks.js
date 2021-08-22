// constants
const initialData = {
  alertSuccess: false,
  alertDelete: false,
  spinnerOn: false,
  alertError: false,
  alertMsg: "",
  alertErrorMsg: ""
};

// types
const ALERT_SUCCESS_ON = "ALERT_SUCCESS_ON";
const ALERT_SUCCESS_OFF = "ALERT_SUCCESS_OFF";
const ALERT_DELETE_ON = "ALERT_DELETE_SUCCESS_ON";
const ALERT_DELETE_OFF = "ALERT_DELETE_SUCCESS_OFF";
const ALERT_ON_ERROR = "ALERT_ON_ERROR";
const ALERT_OFF_ERROR = "ALERT_OFF_ERROR";
const SPINNER_ON = "SPINNER_ON";
const SPINNER_OFF = "SPINNER_OFF";

// reducer
export default function globalReducer(state = initialData, action) {
  switch (action.type) {
    case ALERT_SUCCESS_ON:
      return { ...state, alertSuccess: true, alertMsg: action.payload };
    case ALERT_SUCCESS_OFF:
      return { ...state, alertSuccess: false, alertMsg: "" };
    case ALERT_DELETE_ON:
      return { ...state, alertDelete: true };
    case ALERT_DELETE_OFF:
      return { ...state, alertDelete: false };
    case SPINNER_ON:
      return { ...state, spinnerOn: true };
    case SPINNER_OFF:
      return { ...state, spinnerOn: false };
    case ALERT_ON_ERROR:
      return { ...state, alertError: true, alertErrorMsg: action.payload };
    case ALERT_OFF_ERROR:
      return { ...state, alertError: false, alertErrorMsg: "" };
    default:
      return state;
  }
}

// actions
export const alertSuccessOnAction = message => dispatch => {
  dispatch({
    type: ALERT_SUCCESS_ON,
    payload: message || ""
  });
};

export const alertSuccessOffAction = () => dispatch => {
  dispatch({
    type: ALERT_SUCCESS_OFF
  });
};

export const alertDeleteOnAction = () => dispatch => {
  dispatch({
    type: ALERT_DELETE_ON
  });
};

export const alertDeleteOffAction = () => dispatch => {
  dispatch({
    type: ALERT_DELETE_OFF
  });
};

export const alertOnErrorAction = message => dispatch => {
  dispatch({
    type: ALERT_ON_ERROR,
    payload: message
  });
};

export const alertOffErrorAction = () => dispatch => {
  dispatch({
    type: ALERT_OFF_ERROR
  });
};

export const spinnerOnAction = () => dispatch => {
  dispatch({
    type: SPINNER_ON
  });
};

export const spinnerOffAction = () => dispatch => {
  dispatch({
    type: SPINNER_OFF
  });
};
