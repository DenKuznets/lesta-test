import { Ship } from "@/types";
import { getShips } from "@/utils/getShips";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import DropDown from "./DropDown";
import { PaginatedItems } from "@/app/paginatedItems";
import { getLevelFilters, getTypeFilters } from "@/utils/getFilters";
import { filterShipsByLevel, filterShipsByType } from "@/utils/filterShips";

export const ItemsComponent = () => {
    const [ships, setShips] = useState<Ship[]>();
    const [filteredShips, setFilteredShips] = useState<Ship[] | null>(null);
    const [levelFilter, setLevelFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const resetFilters = () => {
        setFilteredShips(null);
        setLevelFilter("");
        setTypeFilter("");
    };
    // const [nationFilter, setNationFilter] = useState("");

    const { loading, error, data } = useQuery(getShips);
    const levelFilters = useMemo<Set<string>>(
        () => (ships ? getLevelFilters(ships) : new Set()),
        [ships]
    );
    const typeFilters = useMemo<Set<string>>(
        () => (ships ? getTypeFilters(ships) : new Set()),
        [ships]
    );
    // const nationFilters: Set<string> = new Set();

    useEffect(() => {
        if (data) {
            const ships = data.vehicles;
            setShips(ships);
        }
    }, [data]);

    if (loading)
        return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(data);
    return (
        <div>
            <div>
                Filter by:
                <DropDown
                    handleClick={(filter) => {
                        if (filter === levelFilter) return null;

                        setLevelFilter(filter);
                        setTypeFilter("");
                        filter &&
                            ships &&
                            setFilteredShips(filterShipsByLevel(filter, ships));
                    }}
                    filters={Array.from(levelFilters)}
                >
                    Level {levelFilter}
                </DropDown>
                <DropDown
                    handleClick={(filter) => {
                        if (filter === typeFilter) return null;

                        setTypeFilter(filter);
                        setLevelFilter("");
                        filter &&
                            ships &&
                            setFilteredShips(filterShipsByType(filter, ships));
                    }}
                    filters={Array.from(typeFilters)}
                >
                    Type {typeFilter}
                </DropDown>
                <button onClick={resetFilters} className="btn">
                    reset filter
                </button>
            </div>
            {ships && (
                <PaginatedItems
                    items={filteredShips ? filteredShips : ships}
                    itemsPerPage={3}
                />
            )}
        </div>
    );
};
