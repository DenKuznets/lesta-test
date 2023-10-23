import { Ship } from "@/types";
import { getShips } from "@/utils/getShips";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import DropDown from "./DropDown";
import { PaginatedItems } from "@/app/paginatedItems";
import { getLevelFilters, getTypeFilters } from "@/utils/getFilters";
import { filterShipsByLevel, filterShipsByType } from "@/utils/filterShips";

export const ItemsComponent = () => {
    const [shipItems, setShipItems] = useState<Ship[]>();
    const [currentFilter, setCurrentFilter] = useState<string | null>(null);
    const [filteredShipItems, setFilteredShipItems] = useState<Ship[] | null>(
        null
    );
    const [levelFilter, setLevelFilter] = useState<string | null>(null);
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    // const [nationFilter, setNationFilter] = useState("");

    const { loading, error, data } = useQuery(getShips);
    const levelFilters = useMemo<Set<string>>(
        () => (shipItems ? getLevelFilters(shipItems) : new Set()),
        [shipItems]
    );
    const typeFilters = useMemo<Set<string>>(
        () => (shipItems ? getTypeFilters(shipItems) : new Set()),
        [shipItems]
    );
    // const typeFilters: Set<string> = new Set();
    // const nationFilters: Set<string> = new Set();

    useEffect(() => {
        if (data) {
            const ships = data.vehicles;
            setShipItems(ships);
        }
    }, [data]);

    useEffect(() => {
        switch (true) {
            case !!levelFilter && !!shipItems:
                setFilteredShipItems(
                    filterShipsByLevel(levelFilter, shipItems)
                );
                setCurrentFilter(levelFilter);
                // setLevelFilter(null);
                break;
            case !!typeFilter && !!shipItems:
                setFilteredShipItems(filterShipsByType(typeFilter, shipItems));
                setCurrentFilter(typeFilter);
                // setLevelFilter(null);
                break;

            default:
                break;
        }
    }, [levelFilter, shipItems, typeFilter]);

    if (loading)
        return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return <p>Error : {error.message}</p>;

    // console.log(data);
    return (
        <div>
            <div>
                Filter by:
                <DropDown
                    handleClick={(item) => setLevelFilter(item)}
                    items={Array.from(levelFilters)}
                >
                    {`Level${
                        levelFilter && currentFilter ? `: ${currentFilter}` : ""
                    }`}
                </DropDown>
                <DropDown
                    handleClick={(item) => setLevelFilter(item)}
                    items={Array.from(typeFilters)}
                >
                    {`Type${
                        typeFilter && currentFilter ? `: ${currentFilter}` : ""
                    }`}
                </DropDown>
                <button
                    onClick={() => {
                        setFilteredShipItems(null);
                        setCurrentFilter(null);
                        setLevelFilter(null);
                        setTypeFilter(null);
                    }}
                    className="btn"
                >
                    reset filter
                </button>
            </div>
            {shipItems && (
                <PaginatedItems
                    items={filteredShipItems ? filteredShipItems : shipItems}
                    itemsPerPage={3}
                />
            )}
        </div>
    );
};
