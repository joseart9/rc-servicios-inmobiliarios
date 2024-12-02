import Link from "next/link";
import { TbFileSad } from "react-icons/tb";

export default function NotFound() {
  return (
    <main className="min-h-screen w-screen flex items-center justify-center">
      <section className="flex flex-col items-center justify-center">
        <TbFileSad className="text-9xl text-accent" />
        <h1 className="text-4xl font-bold text-accent">404</h1>
        <p className="text-lg text-accent/50">Página no encontrada</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
