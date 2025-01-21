import InmueblesNavbar from "@/app/inmuebles/components/Navbar";

export default function Nosotros() {
    return (
        <InmueblesNavbar>
            <h1 className="text-primary-dark text-4xl font-bold py-6 mb-7 px-8">
                Nosotros
            </h1>

            <div className="flex flex-col space-y-12 items-center p-4">
                <section className="flex flex-col md:grid grid-cols-12 gap-8  p-4 rounded-lg items-center">
                    <div
                        className="w-full md:col-span-6 h-64 bg-cover bg-center text-white rounded-lg flex items-center justify-center"
                        style={{ backgroundImage: "url('/mision.jpeg')" }}
                    >
                        <h2 className="text-2xl font-bold text-white bg-primary-dark/25 p-4 w-full">
                            Misión
                        </h2>
                    </div>

                    <div className="col-span-6">
                        <p className="text-primary-dark font-semibold mb-4 text-pretty pr-8">
                            En RC Servicios Inmobiliarios, nuestra misión es ofrecer soluciones inmobiliarias integrales y personalizadas que brinden confianza y seguridad a nuestros clientes.
                        </p>
                        <p className="text-primary-dark font-semibold text-pretty pr-8">
                            Nos especializamos en la venta y renta de bienes raíces, pero también ofrecemos servicios adicionales como valuaciones de propiedades, pólizas jurídicas y asesoría en créditos hipotecarios. Nuestro compromiso es ayudar a nuestros clientes a tomar decisiones informadas y seguras, asegurando que cada paso en su proceso inmobiliario sea satisfactorio y exitoso.
                        </p>
                    </div>
                </section>

                <section className="hidden md:grid grid-cols-12 gap-8  p-4 rounded-lg items-center">
                    <div className="col-span-6">
                        <p className="text-primary-dark font-semibold mb-4 text-pretty pr-8">
                            Nuestra visión es ser líderes en el mercado inmobiliario, destacándonos por nuestra atención al cliente, innovación y calidad en cada uno de los servicios que ofrecemos.
                        </p>
                        <p className="text-primary-dark font-semibold text-pretty pr-8">
                            Buscamos ser la opción preferida para quienes desean realizar transacciones inmobiliarias de manera segura y profesional, ampliando constantemente nuestro alcance y adaptándonos a las necesidades de un mercado en constante cambio.
                        </p>
                    </div>

                    <div
                        className="col-span-6 h-64 bg-cover bg-center text-white rounded-lg flex items-center justify-center"
                        style={{ backgroundImage: "url('/vision.jpeg')" }}
                    >
                        <h2 className="text-2xl font-bold text-white bg-primary-dark/25 p-4 w-full">
                            Visión
                        </h2>
                    </div>
                </section>

                <section className="flex flex-col md:hidden gap-8  p-4 rounded-lg items-center">
                    <div
                        className="w-full h-64 bg-cover bg-center text-white rounded-lg flex items-center justify-center"
                        style={{ backgroundImage: "url('/vision.jpeg')" }}
                    >
                        <h2 className="text-2xl font-bold text-white bg-primary-dark/25 p-4 w-full">
                            Visión
                        </h2>
                    </div>

                    <div className="w-full">
                        <p className="text-primary-dark font-semibold mb-4 text-pretty pr-8">
                            Nuestra visión es ser líderes en el mercado inmobiliario, destacándonos por nuestra atención al cliente, innovación y calidad en cada uno de los servicios que ofrecemos.
                        </p>
                        <p className="text-primary-dark font-semibold text-pretty pr-8">
                            Buscamos ser la opción preferida para quienes desean realizar transacciones inmobiliarias de manera segura y profesional, ampliando constantemente nuestro alcance y adaptándonos a las necesidades de un mercado en constante cambio.
                        </p>
                    </div>
                </section>

                <section className="flex flex-col md:grid grid-cols-12 gap-8  p-4 rounded-lg items-center">
                    <div
                        className="w-full md:col-span-6 h-64 bg-cover bg-center text-white rounded-lg flex items-center justify-center"
                        style={{ backgroundImage: "url('/valores.jpeg')" }}
                    >
                        <h2 className="text-2xl font-bold text-white bg-primary-dark/25 p-4 w-full">
                            Valores
                        </h2>
                    </div>

                    <div className="col-span-6">
                        <p className="text-primary-dark font-semibold mb-4 text-pretty pr-8">
                            En RC Servicios Inmobiliarios trabajamos con los más altos estándares de ética, transparencia y profesionalismo. Nos guiamos por la honestidad, el respeto y el compromiso con nuestros clientes, buscando siempre ofrecer el mejor servicio posible.
                        </p>
                        <p className="text-primary-dark font-semibold text-pretty pr-8">
                            Creemos en la importancia de la confianza mutua y en el poder de un trabajo bien hecho, lo que nos impulsa a seguir mejorando y creciendo junto a nuestros clientes.
                        </p>
                    </div>
                </section>
            </div>
        </InmueblesNavbar>
    )
}