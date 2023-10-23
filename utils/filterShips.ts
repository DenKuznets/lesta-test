import { Ship } from "@/types";

export const filterShipsByLevel = (
    levelFilter: string,
    shipItems: Ship[]
): Ship[] => {
    return shipItems.filter((ship) => ship.level === levelFilter);
};
