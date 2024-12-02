import { useEffect, useState, useMemo } from "react";
import { getInmuebles, getInmueblesFiltered } from "@/server/actions/inmuebles";
import Inmueble from "@/types/Inmueble";

interface UseInmueblesResult {
  inmuebles: Inmueble[] | null;
  loading: boolean;
  error: string | null;
}

interface OrderByField {
  field: string; // Campo para ordenar
  direction: "asc" | "desc"; // Dirección de orden
}

export default function useInmuebles({
  filter,
  subFilter,
  orderByData,
}: {
  filter?: any;
  subFilter?: any;
  orderByData?: OrderByField;
}): UseInmueblesResult {
  const [inmuebles, setInmuebles] = useState<Inmueble[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedFilter = useMemo(() => filter, [filter]);
  const memoizedSubFilter = useMemo(() => subFilter, [subFilter]);
  const memoizedOrderByData = useMemo(() => orderByData, [orderByData]);

  console.log(
    "MEMOIZED DATA:",
    memoizedFilter,
    memoizedSubFilter,
    memoizedOrderByData
  );

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        setLoading(true);

        let data;
        if (memoizedFilter || memoizedOrderByData) {
          // Llama a getInmueblesFiltered si hay filtro u ordenamiento
          data = await getInmueblesFiltered(
            memoizedFilter || "", // Si no hay filtro, pasa un string vacío
            memoizedSubFilter,
            memoizedOrderByData
          );
        } else {
          // Llama a getInmuebles solo si no hay filtro ni ordenamiento
          data = await getInmuebles();
        }

        setInmuebles(data);
      } catch (err) {
        console.error("Error al obtener inmuebles:", err);
        setError("No se pudieron obtener los inmuebles");
      } finally {
        setLoading(false);
      }
    };

    fetchInmuebles();
  }, [memoizedFilter, memoizedSubFilter, memoizedOrderByData]);

  return { inmuebles, loading, error };
}
