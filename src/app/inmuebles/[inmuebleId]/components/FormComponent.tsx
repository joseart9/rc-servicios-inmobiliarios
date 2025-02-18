import { Input, Textarea, Button } from "@nextui-org/react";
import Inmueble from "@/types/Inmueble";
import { useState } from "react";

export default function FormComponent({ inmueble }: { inmueble: Inmueble }) {

    const [formValues, setFormValues] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        mensaje: `Estoy interesado en obtener más información sobre el inmueble:\n\n${inmueble.nombre}`
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div
            className="pt-4 col-span-1 text-center shadow-sm rounded-lg w-full bg-white/50"
        >
            <h3 className="text-xl text-primary-dark font-semibold pb-8 uppercase">
                Contacto
            </h3>
            <form className="flex flex-col gap-3 items-end w-full p-4">
                <Input
                    type="text"
                    label="Nombre"
                    variant="underlined"
                    color="warning"
                    name="nombre"
                    size="lg"
                    className="text-primary-dark/60"
                    isRequired
                    required
                    value={formValues.nombre}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    type="email"
                    label="Correo"
                    variant="underlined"
                    color="warning"
                    name="correo"
                    size="lg"
                    className="text-primary-dark/60"
                    isRequired
                    required
                    value={formValues.correo}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    type="tel"
                    label="Teléfono"
                    variant="underlined"
                    color="warning"
                    name="telefono"
                    size="lg"
                    className="text-primary-dark/60"
                    isRequired
                    required
                    value={formValues.telefono}
                    onChange={(e) => handleChange(e)}
                />
                <Textarea
                    type="text"
                    label="Mensaje"
                    variant="underlined"
                    color="warning"
                    name="mensaje"
                    size="lg"
                    className="text-primary-dark/60"
                    isRequired
                    required
                    value={formValues.mensaje}
                    onChange={(e) => handleChange(e)}

                />
                <div className="pt-4">
                    <Button
                        type="submit"
                        className="text-white"
                        variant="solid"
                        color="warning"
                        size="lg"
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </div>
    )
}