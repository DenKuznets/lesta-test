import { Ship } from "@/types";

export const filterShipsByLevel = (
    filter: string,
    shipItems: Ship[]
): Ship[] => {
    return shipItems.filter((ship) => ship.level === filter);
};

export const filterShipsByType = (
    filter: string,
    shipItems: Ship[]
): Ship[] => {
    return shipItems.filter((ship) => ship.type.name === filter);
};

export const filterShipsByNation = (
    filter: string,
    shipItems: Ship[]
): Ship[] => {
    return shipItems.filter((ship) => ship.nation.name === filter);
};