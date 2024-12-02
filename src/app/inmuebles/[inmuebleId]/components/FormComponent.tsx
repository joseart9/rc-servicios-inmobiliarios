import { Input, Textarea, Button } from "@nextui-org/react";

export default function FormComponent() {
    return (
        <div className="col-span-1 w-full text-center shadow-sm rounded-lg p-2 border-2 bg-white border-accent">
            <h3 className="text-xl font-semibold text-accent/70">
                Contacto
            </h3>
            <form className="flex flex-col gap-3 items-end w-full">
                <Input type="text" placeholder="Nombre" variant="underlined" color="warning" isRequired required />
                <Input type="email" placeholder="Correo" variant="underlined" color="warning" isRequired required />
                <Input type="tel" placeholder="Telefono" variant="underlined" color="warning" isRequired required />
                <Textarea type="text" placeholder="Mensaje" variant="underlined" color="warning" isRequired required />
                <Button type="submit" className="text-white" variant="solid" color="warning" size="md">
                    Enviar
                </Button>
            </form>
        </div>
    )
}