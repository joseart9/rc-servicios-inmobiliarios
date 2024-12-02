import Inmueble from "@/types/Inmueble";

const defaultValues: Inmueble = {
  idInmueble: "",
  nombre: "",
  descripcion: "",
  amueblado: false,
  direccion: {
    calle: "",
    numeroExterior: undefined,
    numeroInterior: undefined,
    colonia: "",
    ciudad: "",
    estado: "",
    pais: "",
    cp: "",
  },
  tipoInmueble: undefined,
  terreno: {
    terreno: undefined,
    superficieTotal: undefined,
    superficieCubierta: undefined,
  },
  tipoOperacion: undefined,
  precio: {
    monto: undefined,
    moneda: "MXN",
    incluyeIVA: true,
    iva: 16,
    montoTotal: undefined,
  },
  imagenes: [],
  caracteristicas: {
    recamaras: undefined,
    medioBanos: undefined,
    banosCompletos: undefined,
    estacionamientos: undefined,
    antiguedad: undefined,
    antiguedadTiempo: undefined,
    niveles: undefined,
    amenidades: [],
    servicios: [],
    mascotas: false,
    privada: false,
  },
};

export default defaultValues;
