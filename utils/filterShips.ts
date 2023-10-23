import { Ship } from "@/types";

export const filterShipsByLevel = (
    levelFilter: string,
    shipItems: Ship[]
): Ship[] => {
    return shipItems.filter((ship) => ship.level === levelFilter);
};

export const filterShipsByType = (
    typeFilter: string,
    shipItems: Ship[]
): Ship[] => {
    return shipItems.filter((ship) => ship.type.name === typeFilter);
};
