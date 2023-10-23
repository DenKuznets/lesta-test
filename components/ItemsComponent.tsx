import { Ship } from "@/types";
import { getShips } from "@/utils/getShips";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import DropDown from "./DropDown";
import { PaginatedItems } from "@/app/paginatedItems";
import {
    getLevelFilters,
    getNationFilters,
    getTypeFilters,
} from "@/utils/getFilters";
import {
    filterShipsByLevel,
    filterShipsByNation,
    filterShipsByType,
} from "@/utils/filterShips";

export const ItemsComponent = () => {
    const [ships, setShips] = useState<Ship[]>();
    const [filteredShips, setFilteredShips] = useState<Ship[] | null>(null);
    const [levelFilter, setLevelFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [nationFilter, setNationFilter] = useState("");
    const resetFilters = () => {
        setFilteredShips(null);
        setLevelFilter("");
        setTypeFilter("");
        setNationFilter("");
    };

    const { loading, error, data } = useQuery(getShips);
    const levelFilters = useMemo<Set<string>>(
        () => (ships ? getLevelFilters(ships) : new Set()),
        [ships]
    );
    const typeFilters = useMemo<Set<string>>(
        () => (ships ? getTypeFilters(ships) : new Set()),
        [ships]
    );
    const nationFilters = useMemo<Set<string>>(
        () => (ships ? getNationFilters(ships) : new Set()),
        [ships]
    );

    useEffect(() => {
        if (data) {
            const ships = data.vehicles;
            setShips(ships);
        }
    }, [data]);

    if (loading)
        return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <div>
                Filter by:
                <DropDown
                    handleClick={(filter) => {
                        if (filter === levelFilter) return null;

                        setLevelFilter(filter);
                        setTypeFilter("");
                        setNationFilter("");
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
                        setNationFilter("");
                        filter &&
                            ships &&
                            setFilteredShips(filterShipsByType(filter, ships));
                    }}
                    filters={Array.from(typeFilters)}
                >
                    Type {typeFilter}
                </DropDown>
                <DropDown
                    handleClick={(filter) => {
                        if (filter === nationFilter) return null;

                        setNationFilter(filter);
                        setLevelFilter("");
                        setTypeFilter("");
                        filter &&
                            ships &&
                            setFilteredShips(
                                filterShipsByNation(filter, ships)
                            );
                    }}
                    filters={Array.from(nationFilters)}
                >
                    Nation {nationFilter}
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
