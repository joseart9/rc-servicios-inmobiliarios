export default function FooterComponent() {
    return (
        <>
            <footer className="footer h-fit bg-primary/5 p-10">
                <nav>
                    <h6 className="footer-title">¿Qué estás buscando?</h6>
                    <a className="link link-hover" href="/inmuebles/venta">Comprar Inmueble</a>
                    <a className="link link-hover" href="/inmuebles/renta">Rentar Inmueble</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Servicios</h6>
                    <a className="link link-hover" href="/valuacion">Valuación</a>
                    <a className="link link-hover" href="/poliza">Pólizas Jurídicas</a>
                    <a className="link link-hover" href="/credito">Crédito</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Empresa</h6>
                    <a className="link link-hover" href="/nosotros">Nosotros</a>
                    <a className="link link-hover" href="/tya">Términos y Condiciones</a>
                </nav>
            </footer>
            <footer className="footer bg-accent text-white border-accent border-t px-10 py-4">
                <aside className="grid-flow-col items-center">
                    LOGO
                    <p>
                        RC Servicios Inmobiliarios
                        <br />
                        Powered by Araf Innovations 2024
                    </p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        REDES
                    </div>
                </nav>
            </footer>
        </>
    )
}