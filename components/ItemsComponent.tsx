import { Ship } from "@/types";
import { getShips } from "@/utils/getShips";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { PaginatedItems } from "@/app/paginatedItems";

export const ItemsComponent = () => {
    const [shipItems, setShipItems] = useState<Ship[]>();
    const [levelFilter, setLevelFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [nationFilter, setNationFilter] = useState("");

    const { loading, error, data } = useQuery(getShips);
    const levelFilters: Set<string> = new Set();
    const typeFilters: Set<string> = new Set();
    const nationFilters: Set<string> = new Set();

    useEffect(() => {
        if (data) {
            const ships = data.vehicles;
            setShipItems(ships);
            // data.vehicles.map((ship: Ship) => {
            //     levelFilters.add(ship.level);
            //     typeFilters.add(ship.type.name);
            //     nationFilters.add(ship.nation.name);
            // });
        }
    }, [data]);

    // useEffect(() => {
    //     switch (true) {
    //         case levelFilter !== "":
    //             shipItems && setShipItems(filterShipsByLevel(shipItems));
    //             setLevelFilter("");
    //             break;

    //         default:
    //             break;
    //     }
    // }, [shipItems, levelFilter]);

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
            {shipItems && <PaginatedItems items={shipItems} itemsPerPage={3} />}
        </div>
    );
};
