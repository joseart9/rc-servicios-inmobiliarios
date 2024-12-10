"use server";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Query,
  orderBy,
  Timestamp,
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

    const inmuebles: Inmueble[] = querySnapshot.docs.map((doc) => {
      const data = JSON.parse(JSON.stringify(doc.data())); // Asegúrate de que no hay referencias al objeto original
      delete data.createdAt; // Remueve el campo "createdAt"
      return data;
    }) as unknown as Inmueble[];

    return inmuebles;
  } catch (error) {
    console.error("Error al obtener los inmuebles: ", error);
    throw new Error("No se pudieron obtener los inmuebles");
  }
}

export interface orderByField {
  field: string;
  direction: "asc" | "desc";
}

export async function getInmueblesFiltered(
  filtro?: string,
  subFiltro?: FilterComponentProps[],
  orderByData?: orderByField
): Promise<Inmueble[]> {
  try {
    const inmueblesCollection = collection(firestore, "inmuebles");

    // Inicia la consulta sin condiciones si no hay filtro
    let q: Query = inmueblesCollection;

    // Agrega la condición de "tipoOperacion" solo si el filtro está definido
    if (filtro) {
      q = query(q, where("tipoOperacion", "==", filtro));
    }

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
      // Timestamps
      createdAt: "createdAt",
    };

    if (subFiltro) {
      for (const filter of subFiltro) {
        const { filterKey, value, type } = filter;

        const fieldPath = fieldPathMapping[filterKey!];
        if (!fieldPath) continue;

        if (type === "slider" && Array.isArray(value)) {
          const [minValue, maxValue] = value;
          q = query(q, where(fieldPath, ">=", minValue));
          q = query(q, where(fieldPath, "<=", maxValue));
        } else if (type === "select" || type === "checkbox") {
          q = query(q, where(fieldPath, "==", value));
        }
      }
    }

    if (orderByData?.field) {
      const fieldPath = fieldPathMapping[orderByData.field];
      if (fieldPath) {
        q = query(q, orderBy(fieldPath, orderByData?.direction));
      }
    }

    const querySnapshot = await getDocs(q);

    const inmuebles: Inmueble[] = querySnapshot.docs.map((doc) => {
      const data = JSON.parse(JSON.stringify(doc.data())); // Asegúrate de que no hay referencias al objeto original
      delete data.createdAt; // Remueve el campo "createdAt"
      return data;
    }) as unknown as Inmueble[];

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
    const data = querySnapshot.docs[0].data();
    const { createdAt, ...filteredData } = data;
    return {
      ...filteredData,
      createdAt: createdAt?.toDate().toISOString() || null,
    } as Inmueble;
    // return querySnapshot.docs[0].data() as Inmueble;
  } catch (error) {
    console.error("Error al obtener el inmueble: ", error);
    throw new Error("No se pudo obtener el inmueble");
  }
}
