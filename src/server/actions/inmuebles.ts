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
  updateDoc,
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
  filtro?: string
): Promise<Inmueble[]> {
  try {
    const inmueblesCollection = collection(firestore, "inmuebles");

    // Inicia la consulta sin condiciones si no hay filtro
    let q: Query = inmueblesCollection;

    // Agrega la condición de "tipoOperacion" solo si el filtro está definido
    if (filtro) {
      q = query(q, where("tipoOperacion", "==", filtro));
    }

    const querySnapshot = await getDocs(q);

    const inmuebles: Inmueble[] = querySnapshot.docs.map((doc) => {
      const data = JSON.parse(JSON.stringify(doc.data())); // Asegúrate de que no hay referencias al objeto original
      // delete data.createdAt; // Remueve el campo "createdAt"
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
    const inmueblesCollection = collection(firestore, "inmuebles");

    const q = query(inmueblesCollection, where("idInmueble", "==", idInmueble));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const data = querySnapshot.docs[0].data();

    // Verifica si createdAt es un Timestamp y conviértelo si es necesario
    const createdAt =
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : data.createdAt;

    return {
      ...data,
      createdAt: createdAt || null,
    } as Inmueble;
  } catch (error) {
    console.error("Error al obtener el inmueble: ", error);
    throw new Error("No se pudo obtener el inmueble");
  }
}

export async function updateInmueble(inmueble: Inmueble): Promise<void> {
  try {
    const inmueblesCollection = collection(firestore, "inmuebles");

    console.log("Actualizando inmueble con ID: ", inmueble.idInmueble);

    // Buscar el documento con el idInmueble proporcionado
    const q = query(
      inmueblesCollection,
      where("idInmueble", "==", inmueble.idInmueble)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No se encontró el inmueble con el id proporcionado.");
    }

    // Obtener la referencia del documento a actualizar
    const docRef = querySnapshot.docs[0].ref;

    // Actualizar el documento con los nuevos datos
    const inmuebleData = JSON.parse(JSON.stringify(inmueble));
    await updateDoc(docRef, inmuebleData);

    console.log("Inmueble actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el inmueble: ", error);
    throw new Error("No se pudo actualizar el inmueble.");
  }
}
