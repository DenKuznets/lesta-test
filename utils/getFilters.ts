import { Ship } from "@/types";

export const getLevelFilters = (ships: Ship[]) => {
    const filter = new Set<string>();
    ships.map((ship: Ship) => {
        filter.add(ship.level);
    });
    return filter;
};

export const getTypeFilters = (ships: Ship[]) => {
    const filter = new Set<string>();
    ships.map((ship: Ship) => {
        filter.add(ship.type.name);
    });
    return filter;
};
export const getNationFilters = (ships: Ship[]) => {
    const filter = new Set<string>();
    ships.map((ship: Ship) => {
        filter.add(ship.nation.name);
    });
    return filter;
};
