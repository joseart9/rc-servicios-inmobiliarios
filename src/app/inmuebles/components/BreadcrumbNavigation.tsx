import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'; // Ajusta según tu librería

const BreadcrumbNavigation = ({ pathname }: { pathname: string }) => {
    const pathSegments = pathname.split('/').filter(Boolean); // Dividir por '/' y eliminar segmentos vacíos
    const breadcrumbPaths = pathSegments.map((segment, index) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalizar
        href: '/' + pathSegments.slice(0, index + 1).join('/'), // Construir el href acumulativo
    }));

    return (
        <Breadcrumbs>
            <BreadcrumbItem href="/">
                <p className='text-primary-dark/40'>
                    Inicio
                </p>
            </BreadcrumbItem>
            {breadcrumbPaths.map((breadcrumb) => (
                <BreadcrumbItem
                    key={breadcrumb.href}
                    className="capitalize"
                    href={breadcrumb.href}
                >
                    <p className='text-primary-dark/40'>
                        {breadcrumb.label}
                    </p>

                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
};

export default BreadcrumbNavigation;
