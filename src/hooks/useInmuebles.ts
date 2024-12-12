import { useEffect, useState, useMemo } from "react";
import Inmueble from "@/types/Inmueble";
import { getInmuebles, getInmueblesFiltered } from "@/server/actions/inmuebles";
import { FilterComponentProps } from "@/app/inmuebles/components/FilterComponent/FilterComponent";

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
  subFilter?: FilterComponentProps[];
  orderByData?: OrderByField;
}): UseInmueblesResult {
  const [allInmuebles, setAllInmuebles] = useState<Inmueble[] | null>(null);
  const [filteredInmuebles, setFilteredInmuebles] = useState<Inmueble[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedSubFilter = useMemo(() => subFilter, [subFilter]);
  const memoizedOrderByData = useMemo(() => orderByData, [orderByData]);

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
    servicios: "caracteristicas.servicios",
    amenidades: "caracteristicas.amenidades",
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

  console.log("Memoized orderByData", memoizedOrderByData);

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        setLoading(true);

        // Obtén todos los inmuebles del servidor
        const data = await getInmueblesFiltered(filter);
        setAllInmuebles(data);
        setFilteredInmuebles(data); // Inicialmente muestra todos los inmuebles
      } catch (err) {
        console.error("Error al obtener inmuebles:", err);
        setError("No se pudieron obtener los inmuebles");
      } finally {
        setLoading(false);
      }
    };

    fetchInmuebles();
  }, []);

  useEffect(() => {
    if (!allInmuebles) return;

    let filtered = [...allInmuebles];

    // Aplica los sub-filtros
    if (memoizedSubFilter) {
      for (const filter of memoizedSubFilter) {
        const { filterKey, value, type } = filter;

        // Usa fieldPathMapping para obtener el path correcto
        const fieldPath = filterKey ? fieldPathMapping[filterKey] : undefined;
        if (!fieldPath) continue; // Si no existe el campo en el mapeo, ignóralo

        filtered = filtered.filter((inmueble) => {
          const fieldValue = getFieldValue(inmueble, fieldPath);

          if (type === "slider" && Array.isArray(value)) {
            const [minValue, maxValue] = value;
            return fieldValue >= minValue && fieldValue <= maxValue;
          } else if (type === "select" || type === "checkbox") {
            return fieldValue === value;
          } else if (type === "multiSelect") {
            if (Array.isArray(value) && Array.isArray(fieldValue)) {
              // Extrae los valores de `nombre` si los elementos son objetos
              const fieldValuesAsStrings = fieldValue.map((item) =>
                typeof item === "object" && item.nombre ? item.nombre : item
              );

              // Retorna true si hay al menos un elemento común entre los arrays
              return value.some((selectedValue) =>
                fieldValuesAsStrings.includes(selectedValue)
              );
            } else if (Array.isArray(value)) {
              // Si `fieldValue` no es un array, revisa si está en los valores seleccionados
              return value.includes(fieldValue);
            }
          }

          return true;
        });
      }
    }

    // Aplica el ordenamiento
    if (memoizedOrderByData) {
      const { field, direction } = memoizedOrderByData;

      const fieldPath = fieldPathMapping[field];
      if (fieldPath) {
        filtered.sort((a, b) => {
          let aValue = getFieldValue(a, fieldPath);
          let bValue = getFieldValue(b, fieldPath);

          // Si el campo es "createdAt", conviértelo a Date
          if (field === "createdAt") {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
          }

          if (direction === "desc") return aValue > bValue ? -1 : 1;
          return aValue < bValue ? -1 : 1;
        });
      }
    }

    setFilteredInmuebles(filtered);
  }, [allInmuebles, memoizedSubFilter, memoizedOrderByData]);

  return { inmuebles: filteredInmuebles, loading, error };
}

// Helper para obtener valores de un campo anidado
function getFieldValue(obj: any, fieldPath: string) {
  return fieldPath.split(".").reduce((value, key) => value?.[key], obj);
}
