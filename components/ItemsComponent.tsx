import { Ship } from "@/types";
import { getShips } from "@/utils/getShips";
import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import DropDown from "./DropDown";
import { PaginatedItems } from "@/app/paginatedItems";
import { getLevelFilters } from "@/utils/getFilters";
import { filterShipsByLevel } from "@/utils/filterShips";

export const ItemsComponent = () => {
    const [shipItems, setShipItems] = useState<Ship[]>();
    const [filteredShipItems, setFilteredShipItems] = useState<Ship[]>();
    const [levelFilter, setLevelFilter] = useState<string | null>(null);
    // const [typeFilter, setTypeFilter] = useState("");
    // const [nationFilter, setNationFilter] = useState("");

    const { loading, error, data } = useQuery(getShips);
    const levelFilters = useMemo<Set<string>>(
        () => (shipItems ? getLevelFilters(shipItems) : new Set()),
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
                setLevelFilter(null);
                break;

            default:
                break;
        }
    }, [levelFilter, shipItems]);

    if (loading)
        return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(data);
    return (
        <div>
            <div>
                Filter by:
                <DropDown
                    handleClick={(item) => setLevelFilter(item)}
                    items={Array.from(levelFilters)}
                >
                    Level
                </DropDown>
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
