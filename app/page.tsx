"use client";

import Image from "next/image";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
    useQuery,
} from "@apollo/client";
import { PaginatedItems } from "./paginatedItems";
import { Ship } from "@/types";
import ShipCard from "@/components/ShipCard/ShipCard";
import { useEffect, useState } from "react";
import DropDown from "@/components/DropDown";

const client = new ApolloClient({
    // uri: "https://flyby-router-demo.herokuapp.com/",
    uri: "https://vortex.korabli.su/api/graphql/glossary/",
    cache: new InMemoryCache(),
});

const GET_SHIPS = gql`
    query GetLocations {
        vehicles {
            title
            description
            icons {
                large
                medium
            }
            level
            type {
                name
                title
                icons {
                    default
                }
            }
            nation {
                name
                title
                color
                icons {
                    small
                    medium
                    large
                }
            }
        }
    }
`;

const ItemsComponent = () => {
    const [filteredShipItems, setFilteredShipItems] = useState();
    const [levelFilter, setLevelFilter] = useState<string>();
    const [typeFilter, setTypeFilter] = useState();
    const [nationFilter, setNationFilter] = useState();

    const { loading, error, data } = useQuery(GET_SHIPS);
    const levelFilters: Set<string> = new Set();
    const typeFilters: Set<string> = new Set();
    const nationFilters: Set<string> = new Set();

    if (loading)
        return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return <p>Error : {error.message}</p>;

    const allShipItems = data.vehicles;
    data &&
        data.vehicles.map((ship: Ship) => {
            levelFilters.add(ship.level);
            typeFilters.add(ship.type.name);
            nationFilters.add(ship.nation.name);
        });
    console.log(levelFilters);
    console.log(typeFilters);
    console.log(nationFilters);
    return (
        <div>
            <div>
                Filter by:
                <DropDown handleItemClick={(item) => setLevelFilter(item)} items={Array.from(levelFilters)} >Level</DropDown>
            </div>
            <PaginatedItems items={allShipItems} itemsPerPage={3} />
        </div>
    );
};

export default function Home() {
    return (
        <ApolloProvider client={client}>
            <main className="flex min-h-screen flex-wrap items-center justify-between p-4">
                {/* <DisplayShips /> */}

                <ItemsComponent />
            </main>
        </ApolloProvider>
    );
}
