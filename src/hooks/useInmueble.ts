import { useState, useEffect } from "react";
import { getInmueble } from "@/server/actions/inmuebles";
import Inmueble from "@/types/Inmueble";

interface UseInmuebleResult {
  inmueble: Inmueble | null;
  loading: boolean;
  error: string | null;
}

export default function useInmueble(idInmueble: string): UseInmuebleResult {
  const [inmueble, setInmueble] = useState<Inmueble | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInmueble = async () => {
      try {
        setLoading(true);
        const data = await getInmueble(idInmueble);

        if (!data) {
          setError("Inmueble no encontrado");
          setInmueble(null);
        } else {
          setInmueble(data);
        }
      } catch (err) {
        console.error("Error al obtener el inmueble:", err);
        setError("No se pudo obtener el inmueble");
      } finally {
        setLoading(false);
      }
    };

    if (idInmueble) {
      fetchInmueble();
    } else {
      setLoading(false);
      setError("ID de inmueble no válido");
    }
  }, [idInmueble]);

  return { inmueble, loading, error };
}
