import { Input, Textarea, Button } from "@nextui-org/react";

export default function FormComponent() {
    return (
        <div
            className="pt-4 col-span-1 text-center shadow-sm rounded-lg w-full border-1 border-primary-dark/30"
        >
            <h3 className="text-xl text-primary-dark font-semibold pb-8 uppercase">
                Contacto
            </h3>
            <form className="flex flex-col gap-3 items-end w-full p-4">
                <Input
                    type="text"
                    placeholder="Nombre"
                    variant="underlined"
                    color="warning"
                    isRequired
                    required
                />
                <Input
                    type="email"
                    placeholder="Correo"
                    variant="underlined"
                    color="warning"
                    isRequired
                    required
                />
                <Input
                    type="tel"
                    placeholder="Teléfono"
                    variant="underlined"
                    color="warning"
                    isRequired
                    required
                />
                <Textarea
                    type="text"
                    placeholder="Mensaje"
                    variant="underlined"
                    color="warning"
                    isRequired
                    required
                />
                <div className="pt-4">
                    <Button
                        type="submit"
                        className="text-white"
                        variant="solid"
                        color="warning"
                        size="md"
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </div>
    )
}