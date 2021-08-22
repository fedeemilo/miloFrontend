// Set value in state of evt
export const handleSetValue = (funcSetter, evt) => {
  return funcSetter(evt.target.value);
};

// Set value in state of files
export const handleSetFiles = (funcSetter, evt) => {
  return funcSetter(evt.target.files);
};

// Set value in state multimedia stuff
export const handleSetMultimedia = (funcSetter, evt) => {
  let media = evt.target.files;
  let arrMedia = [];

  Array.from(media).forEach(elem => arrMedia.push(elem));

  return funcSetter(arrMedia);
};

// Filter user search by searchVal
export const filterArrBox = (arr, filterElem, searchVal) =>
  arr.filter(elem =>
    elem[filterElem].toString().toLowerCase().includes(searchVal)
  );

// Map and set filter option
export const setFilterOption = filterName => {
  switch (filterName) {
    case "Descripción":
      return "descripcion";
    case "Ubicación":
      return "ubicacion";
    case "Dirección":
      return "direccion";
    case "Teléfono":
      return "telefono";
    default:
      return filterName.toLowerCase();
  }
};

// Capitalize string
export const capitalizeString = str => {
  let auxStr = str;

  return auxStr[0].toUpperCase() + auxStr.slice(1).toLowerCase();
};
