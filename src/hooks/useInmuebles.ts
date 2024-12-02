import { useEffect, useState } from "react";
import { getInmuebles, getInmueblesFiltered } from "@/server/actions/inmuebles";
import Inmueble from "@/types/Inmueble";

interface UseInmueblesResult {
  inmuebles: Inmueble[] | null;
  loading: boolean;
  error: string | null;
}

export default function useInmuebles({
  filter,
  subFilter,
}: {
  filter?: any;
  subFilter?: any;
} = {}): UseInmueblesResult {
  const [inmuebles, setInmuebles] = useState<Inmueble[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (filter && subFilter) {
    useEffect(() => {
      const fetchInmueblesFiltered = async () => {
        try {
          setLoading(true);
          const data = await getInmueblesFiltered(filter, subFilter);
          setInmuebles(data);
        } catch (err) {
          console.error("Error al obtener inmuebles:", err);
          setError("No se pudieron obtener los inmuebles");
        } finally {
          setLoading(false);
        }
      };

      fetchInmueblesFiltered();
    }, [filter, subFilter]);
  } else if (filter) {
    useEffect(() => {
      const fetchInmueblesFiltered = async () => {
        try {
          setLoading(true);
          const data = await getInmueblesFiltered(filter, subFilter);
          setInmuebles(data);
        } catch (err) {
          console.error("Error al obtener inmuebles:", err);
          setError("No se pudieron obtener los inmuebles");
        } finally {
          setLoading(false);
        }
      };

      fetchInmueblesFiltered();
    }, [filter, subFilter]);
  } else {
    useEffect(() => {
      const fetchInmuebles = async () => {
        try {
          setLoading(true);
          const data = await getInmuebles();
          setInmuebles(data);
        } catch (err) {
          console.error("Error al obtener inmuebles:", err);
          setError("No se pudieron obtener los inmuebles");
        } finally {
          setLoading(false);
        }
      };

      fetchInmuebles();
    }, []);
  }

  return { inmuebles, loading, error };
}
