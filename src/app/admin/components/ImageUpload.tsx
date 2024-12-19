"use client";

import { Button } from '@nextui-org/button';
import { v4 as uuidv4 } from "uuid";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableImageItem from './SortableImageItem';

export interface ImageUploadProps {
    id: string;
    file?: File;
    url?: string;
    pos?: number;
    uploaded?: boolean;
}

export default function ImageUpload({ images, setImages }: { images: ImageUploadProps[]; setImages: any; }) {

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Puedes ajustar este valor según tus necesidades
            },
        })
    );

    function handleUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true; // Permitir múltiples archivos
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            const files = target.files;
            if (files && files.length > 0) {
                setImages((prevImages: ImageUploadProps[]) => {
                    const newImages = Array.from(files).map((file, index) => {
                        const id = uuidv4();
                        return { id, file, pos: prevImages.length + index + 1, uploaded: false };
                    });
                    return [...prevImages, ...newImages];
                });
            }
        };
        input.click();
    }

    function handleDelete(index: number) {
        setImages((prevImages: ImageUploadProps[]) => prevImages.filter((_, i: number) => i !== index));
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = images.findIndex((img) => img.id === active.id);
            const newIndex = images.findIndex((img) => img.id === over?.id);

            const newImages = arrayMove(images, oldIndex, newIndex);

            // Actualizar los valores de 'pos'
            const updatedImages = newImages.map((img, idx) => ({ ...img, pos: idx + 1 }));

            setImages(updatedImages);
        }
    }

    return (
        <div className="flex gap-5 overflow-x-auto min-w-full pt-2 md:flex-wrap">
            {/* Botón para agregar imágenes */}
            <Button
                onPress={handleUpload}
                className="min-w-[200px] min-h-[200px] hover:bg-gray-200/60 bg-gray-100/50 flex items-center justify-center border-3 border-gray-200 hover:border-gray-300 border-dashed">
                <p className="flex flex-col items-center space-y-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="text-accent w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-accent upp">Agregar Imagen</span>
                </p>
            </Button>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={images.map((img) => img.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="flex gap-5 md:flex-wrap">
                        {images.map((image, index) => (
                            <SortableImageItem
                                key={image.id}
                                image={image}
                                index={index}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
