import { useState, useEffect } from "react";
import { getInmueble } from "@/server/actions/inmuebles";
import Inmueble from "@/types/Inmueble";

export default function useFavInmuebles(favIds: string[]): {
  inmuebles: Inmueble[] | null;
  loading: boolean;
  error: string | null;
} {
  const [inmuebles, setInmuebles] = useState<Inmueble[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        setLoading(true);
        const fetchedInmuebles = await Promise.all(
          favIds.map((id) => getInmueble(id))
        );
        // Filtrar resultados nulos en caso de errores
        const validInmuebles = fetchedInmuebles.filter(
          (inmueble) => inmueble !== null
        );
        setInmuebles(validInmuebles as Inmueble[]);
      } catch (err) {
        console.error("Error al obtener inmuebles favoritos:", err);
        setError("No se pudieron obtener los inmuebles favoritos");
      } finally {
        setLoading(false);
      }
    };

    if (favIds.length > 0) {
      fetchInmuebles();
    } else {
      setLoading(false);
      setInmuebles([]);
    }
  }, [favIds]);

  return { inmuebles, loading, error };
}
