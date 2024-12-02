import { ImageUploadProps } from "@/app/admin/components/SortableImageItem";
import Caracteristicas from "./Caracteristicas";
import Direccion from "./Direccion";
import Precio from "./Precio";
import Terreno from "./Terreno";

export default interface Inmueble {
  idInmueble: string;
  nombre?: string;
  descripcion?: string;
  direccion?: Direccion;
  tipoInmueble?:
    | "casa"
    | "departamento"
    | "terreno"
    | "local"
    | "oficina"
    | "bodega"
    | "edificio"
    | "otro";
  terreno: Terreno;
  tipoOperacion?: "venta" | "renta";
  precio?: Precio;
  amueblado?: boolean;
  imagenes?: ImageUploadProps[];
  // Características del inmueble
  caracteristicas?: Caracteristicas;
}
