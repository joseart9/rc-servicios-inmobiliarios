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

      const { calle, numeroExterior, ciudad, estado, pais, cp } = direccion;

      const url = new URL("https://nominatim.openstreetmap.org/search");
      const params = {
        street: `${calle || ""} ${numeroExterior || ""}`.trim(),
        city: ciudad || "",
        state: estado || "",
        country: pais || "",
        postalcode: cp || "",
        format: "json",
      };

      // Añadir parámetros a la URL
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });

      // DEBUG
      console.log("Fetching coordinates for:", params);
      console.log("URL:", url.toString());

      setLoading(true);

      try {
        const response = await fetch(url.toString());
        const data = await response.json();
        if (data.length > 0) {
          setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError(
            "No se encontraron coordenadas para la dirección proporcionada."
          );
        }
      } catch (err) {
        setError("Error fetching coordinates.");
        console.error("Error fetching coordinates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [direccion]);

  return { coordinates, loading, error };
}
