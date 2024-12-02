// SortableImageItem.tsx
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Button } from '@nextui-org/button';
import { LuTrash2 } from "react-icons/lu";

export interface ImageUploadProps {
    id: string;
    file?: File;
    url?: string;
    pos?: number;
    uploaded?: boolean;
}

interface SortableImageItemProps {
    image: ImageUploadProps;
    index: number;
    handleDelete: (index: number) => void;
}

export default function SortableImageItem({ image, index, handleDelete }: SortableImageItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative w-[200px] h-[200px]"
        >
            <div className="relative flex-shrink-0 items-center">
                <img
                    className="object-cover w-[200px] h-[200px] rounded-lg"
                    src={image.file ? URL.createObjectURL(image.file) : image.url}
                    alt={`Preview ${index + 1}`}
                />
                <Button
                    isIconOnly
                    size='sm'
                    onPress={() => handleDelete(index)}
                    className="absolute -top-2 -right-3 font-bold bg-red-500 text-white rounded-full p-1"
                >
                    <LuTrash2 className='text-xl' />
                </Button>
            </div>
        </div>
    );
}
