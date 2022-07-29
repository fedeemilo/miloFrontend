export const __prod__ = process.env.NODE_ENV === "production";

export const __db__ = __prod__
    ? "https://milo-soft-backend.herokuapp.com"
    : "http://localhost:8000";

export const spareFormData = (
    handleSetValue,
    handleSetMultimedia,
    setName,
    setDesc,
    setQuant,
    setLoc,
    setImages,
    setDatasheet
) => [
    [
        {
            id: "nombreIn",
            type: "text",
            label: "Nombre y Apellido",
            name: "nombre",
            placeholder: "Escribe el nombre...",
            onChange: e => handleSetValue(setName, e),
            multiple: false
        },
        {
            id: "descripcionIn",
            type: "text",
            label: "Descripción",
            name: "descripcion",
            placeholder: "Escribe la descripción...",
            onChange: e => handleSetValue(setDesc, e),
            multiple: false
        },
        {
            id: "cantidadIn",
            type: "number",
            label: "Cantidad",
            name: "cantidad",
            placeholder: "Escribe la cantidad...",
            onChange: e => handleSetValue(setQuant, e),
            multiple: false
        },
        {
            id: "ubicacionIn",
            type: "text",
            label: "Ubicación",
            name: "ubicacion",
            placeholder: "Escribe la ubicación...",
            onChange: e => handleSetValue(setLoc, e),
            multiple: false
        }
    ],
    [
        {
            id: "imagesIn",
            type: "file",
            label: "Imágenes",
            name: "images",
            placeholder: "",
            onChange: e => handleSetMultimedia(setImages, e),
            multiple: true
        },
        {
            id: "datasheetIn",
            type: "file",
            label: "Datasheet",
            name: "datasheet",
            placeholder: "",
            onChange: e => handleSetMultimedia(setDatasheet, e),
            multiple: true
        }
    ]
];

export const clientFormData = (
    handleSetValue,
    setNombre,
    setApellido,
    setDirec,
    setTelefono,
    setEmail,
    setObs
) => [
    [
        {
            id: "nombreIn",
            type: "text",
            label: "Nombre",
            name: "nombre",
            placeholder: "Escribe el nombre...",
            onChange: e => handleSetValue(setNombre, e)
        },
        {
            id: "apellidoIn",
            type: "text",
            label: "Apellido",
            name: "apellido",
            placeholder: "Escribe el apellido...",
            onChange: e => handleSetValue(setApellido, e)
        },
        {
            id: "direccionIn",
            type: "text",
            label: "Dirección",
            name: "direccion",
            placeholder: "Escribe el nombre...",
            onChange: e => handleSetValue(setDirec, e)
        },
        {
            id: "telefonoIn",
            type: "text",
            label: "Email",
            name: "telefono",
            placeholder: "Escribe el teléfono...",
            onChange: e => handleSetValue(setTelefono, e)
        }
    ],
    [
        {
            id: "emailIn",
            type: "email",
            label: "Email",
            name: "email",
            placeholder: "Escribe el email...",
            onChange: e => handleSetValue(setEmail, e)
        },
        {
            id: "observacionesIn",
            type: "textarea",
            label: "Observaciones",
            name: "observaciones",
            placeholder: "Escribe las observaciones...",
            onChange: e => handleSetValue(setObs, e)
        }
    ]
];
