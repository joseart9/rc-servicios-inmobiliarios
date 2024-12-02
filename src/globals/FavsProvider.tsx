import React, { createContext, useContext, useState, useEffect } from "react";

interface Fav {
    id: string;
    dateCreated: Date;
}

interface FavsContextType {
    favs: Fav[];
    addFav: (id: string) => void;
    removeFav: (id: string) => void;
    clearFavs: () => void;
}

const FavsContext = createContext<FavsContextType | undefined>(undefined);

export const FavsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favs, setFavs] = useState<Fav[]>([]);

    // Load favorites from localStorage on initialization
    useEffect(() => {
        const storedFavs = localStorage.getItem("favs");
        if (storedFavs) {
            setFavs(JSON.parse(storedFavs));
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("favs", JSON.stringify(favs));
    }, [favs]);

    const addFav = (id: string) => {
        // Check if the ID already exists
        if (!favs.some((fav) => fav.id === id)) {
            const newFav = { id, dateCreated: new Date() };
            setFavs((prevFavs) => [...prevFavs, newFav]);
        }
    };

    const removeFav = (id: string) => {
        setFavs((prevFavs) => prevFavs.filter((fav) => fav.id !== id));
    };

    const clearFavs = () => {
        setFavs([]);
    };

    return (
        <FavsContext.Provider value={{ favs, addFav, removeFav, clearFavs }}>
            {children}
        </FavsContext.Provider>
    );
};

// Custom hook to use the Favs context
export const useFavs = (): FavsContextType => {
    const context = useContext(FavsContext);
    if (!context) {
        throw new Error("useFavs must be used within a FavsProvider");
    }
    return context;
};
