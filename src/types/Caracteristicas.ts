import Amenidades from "./Amenidades";
import Servicios from "./Servicios";

export default interface Caracteristicas {
  recamaras?: number;
  medioBanos?: number;
  banosCompletos?: number;
  estacionamientos?: number;
  antiguedad?: "nueva" | "usada";
  antiguedadTiempo?: number;
  niveles?: number;
  amenidades?: Amenidades[];
  servicios?: Servicios[];
  mascotas?: boolean;
  privada?: boolean;
  mantenimiento?: number;
}
