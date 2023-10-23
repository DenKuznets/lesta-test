import { Ship } from "@/types";

export const getLevelFilters = (ships: Ship[]) => {
    const filter = new Set<string>();
    ships.map((ship: Ship) => {
        filter.add(ship.level);
    });
    return filter;
};
