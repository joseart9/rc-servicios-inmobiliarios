"use server";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Query,
} from "firebase/firestore";
import db from "@/db";
import Inmueble from "@/types/Inmueble";
import { FilterComponentProps } from "@/app/inmuebles/components/FilterComponent/FilterComponent";

const firestore = getFirestore(db);

export async function addInmueble(inmueble: Inmueble): Promise<string> {
  try {
    // Referencia a la colección "inmuebles"
    const inmueblesCollection = collection(firestore, "inmuebles");

    // Agrega el documento a Firestore
    const docRef = await addDoc(inmueblesCollection, inmueble);

    return docRef.id; // Devuelve el ID del documento agregado si es necesario
  } catch (error) {
    console.error("Error al agregar el inmueble: ", error);
    throw new Error("No se pudo agregar el inmueble");
  }
}

export async function getInmuebles(): Promise<Inmueble[]> {
  try {
    // Referencia a la colección "inmuebles"
    const inmueblesCollection = collection(firestore, "inmuebles");

    // Obtener todos los documentos de la colección
    const querySnapshot = await getDocs(inmueblesCollection);

    // Mapear los documentos a objetos de tipo Inmueble
    const inmuebles: Inmueble[] = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Inmueble[];

    return inmuebles;
  } catch (error) {
    console.error("Error al obtener los inmuebles: ", error);
    throw new Error("No se pudieron obtener los inmuebles");
  }
}

export async function getInmueblesFiltered(
  filtro: string,
  subFiltro?: FilterComponentProps[]
): Promise<Inmueble[]> {
  try {
    const inmueblesCollection = collection(firestore, "inmuebles");

    // Start the query with the 'tipoOperacion' filter
    let q: Query = query(
      inmueblesCollection,
      where("tipoOperacion", "==", filtro)
    );

    // Mapping of filterKey to Firestore field paths
    const fieldPathMapping: { [key: string]: string } = {
      // Precio fields
      monto: "precio.monto",
      moneda: "precio.moneda",
      incluyeIVA: "precio.incluyeIVA",
      iva: "precio.iva",
      montoTotal: "precio.montoTotal",
      // Caracteristicas fields
      recamaras: "caracteristicas.recamaras",
      medioBanos: "caracteristicas.medioBanos",
      banosCompletos: "caracteristicas.banosCompletos",
      estacionamientos: "caracteristicas.estacionamientos",
      antiguedad: "caracteristicas.antiguedad",
      antiguedadTiempo: "caracteristicas.antiguedadTiempo",
      niveles: "caracteristicas.niveles",
      mascotas: "caracteristicas.mascotas",
      privada: "caracteristicas.privada",
      // Terreno fields
      terreno: "terreno.terreno",
      superficieTotal: "terreno.superficieTotal",
      superficieCubierta: "terreno.superficieCubierta",
      // Dirección fields
      calle: "direccion.calle",
      numeroExterior: "direccion.numeroExterior",
      colonia: "direccion.colonia",
      ciudad: "direccion.ciudad",
      estado: "direccion.estado",
      pais: "direccion.pais",
      cp: "direccion.cp",
      // Top-level fields
      idInmueble: "idInmueble",
      nombre: "nombre",
      descripcion: "descripcion",
      amueblado: "amueblado",
      tipoInmueble: "tipoInmueble",
    };

    if (subFiltro) {
      // Loop through subFiltro and add filters to the query
      for (const filter of subFiltro) {
        const { filterKey, value, type } = filter;

        const fieldPath = fieldPathMapping[filterKey!];

        if (!fieldPath) {
          console.warn(
            `No field path mapping found for filterKey: ${filterKey}`
          );
          continue; // Skip this filter if mapping not found
        }

        if (type === "slider" && Array.isArray(value)) {
          const [minValue, maxValue] = value;
          q = query(q, where(fieldPath, ">=", minValue));
          q = query(q, where(fieldPath, "<=", maxValue));
        } else if (type === "select") {
          q = query(q, where(fieldPath, "==", value));
        } else if (type === "checkbox") {
          q = query(q, where(fieldPath, "==", value));
        } else {
          console.warn(`Unhandled filter type: ${type}`);
        }
      }
    }

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Map documents to Inmueble objects
    const inmuebles: Inmueble[] = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Inmueble[];

    return inmuebles;
  } catch (error) {
    console.error("Error al obtener los inmuebles: ", error);
    throw new Error("No se pudieron obtener los inmuebles");
  }
}

export async function getInmueble(
  idInmueble: string
): Promise<Inmueble | null> {
  try {
    // Referencia a la colección "inmuebles"
    const inmueblesCollection = collection(firestore, "inmuebles");

    // Crear una consulta para buscar el inmueble con el campo "idInmueble" igual al proporcionado
    const q = query(inmueblesCollection, where("idInmueble", "==", idInmueble));

    // Ejecutar la consulta
    const querySnapshot = await getDocs(q);

    // Si no se encuentra ningún documento, devolver null
    if (querySnapshot.empty) {
      return null;
    }

    // Devolver los datos del primer documento encontrado
    return querySnapshot.docs[0].data() as Inmueble;
  } catch (error) {
    console.error("Error al obtener el inmueble: ", error);
    throw new Error("No se pudo obtener el inmueble");
  }
}
