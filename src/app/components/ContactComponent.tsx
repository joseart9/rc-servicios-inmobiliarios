import { Input, Button, Textarea } from '@nextui-org/react'

export default function ContactComponent({ bordered, title, defaultMsg, size }: { bordered?: boolean, title?: string, defaultMsg?: string, size?: 'sm' | 'md' | 'lg' }) {
    return (
        <div
            className={`pt-4 col-span-1 text-center shadow-sm rounded-lg
                ${bordered ? `border-1 border-primary-dark/30` : ``} 
                w-full`}
        >
            <h3 className="text-xl text-primary-dark font-semibold pb-8 uppercase">
                {title || ""}
            </h3>
            <form className="flex flex-col gap-3 items-end w-full p-4">
                <Input
                    type="text"
                    label="Nombre"
                    variant="underlined"
                    color="warning"
                    size={size}
                    isRequired
                    required
                    className='text-primary-dark/60'
                />
                <Input
                    type="email"
                    label="Correo"
                    variant="underlined"
                    color="warning"
                    size={size}
                    isRequired
                    required
                    className='text-primary-dark/60'
                />
                <Input
                    type="tel"
                    label="Teléfono"
                    variant="underlined"
                    color="warning"
                    size={size}
                    isRequired
                    required
                    className='text-primary-dark/60'
                />
                <Textarea
                    type="text"
                    label="Mensaje"
                    variant="underlined"
                    color="warning"
                    size={size}
                    isRequired
                    required
                    value={defaultMsg}
                    className='text-primary-dark/60'
                />
                <div className="pt-4">
                    <Button
                        type="submit"
                        className="text-white"
                        variant="solid"
                        color="warning"
                        size={size}
                    >
                        Enviar
                    </Button>
                </div>
            </form>
        </div>
    )
}