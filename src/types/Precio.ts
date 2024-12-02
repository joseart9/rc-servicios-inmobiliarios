export default interface Precio {
  monto?: number;
  moneda?: "MXN" | "USD";
  incluyeIVA?: boolean;
  iva?: number;
  montoTotal?: number;
}
