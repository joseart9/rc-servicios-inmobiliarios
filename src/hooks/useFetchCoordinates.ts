"use client";
import Direccion from "@/types/Direccion";
import { useState, useEffect } from "react";

export function useFetchCoordinates(direccion?: Direccion) {
  const [coordinates, setCoordinates] = useState<[number, number] | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!direccion) {
        setError("No se proporcionó una dirección.");
        setLoading(false);
        return;
      }

      // Normalizar la dirección (convertir todos los valores a minúsculas y eliminar espacios extra)
      const normalize = (value?: string | number) =>
        value?.toString().trim().toLowerCase() || "";

      const {
        calle,
        numeroExterior,
        numeroInterior,
        colonia,
        ciudad,
        estado,
        pais,
        cp,
      } = direccion;

      const query = [
        normalize(calle),
        normalize(numeroExterior),
        normalize(numeroInterior),
        normalize(colonia),
        normalize(ciudad),
        normalize(estado),
        normalize(pais),
        normalize(cp),
      ]
        .filter(Boolean) // Filtrar valores vacíos
        .join(", "); // Unir con comas para formar la consulta

      const apiKey = process.env.NEXT_PUBLIC_GEOCAGE_API_KEY;
      if (!apiKey) {
        setError("La API Key no está configurada.");
        setLoading(false);
        return;
      }

      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        query
      )}&key=${apiKey}&limit=1`;

      // DEBUG
      console.log("Fetching coordinates for query:", query);
      console.log("URL:", url);

      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setCoordinates([lat, lng]);
        } else {
          setError(
            "No se encontraron coordenadas para la dirección proporcionada."
          );
        }
      } catch (err) {
        setError("Error al buscar las coordenadas.");
        console.error("Error fetching coordinates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [direccion]);

  return { coordinates, loading, error };
}
