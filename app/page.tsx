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
    const { loading, error, data } = useQuery(GET_SHIPS);
    const levelFilter : string[] = []
    
    if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return <p>Error : {error.message}</p>;

    data &&
        data.vehicles.map((ship: Ship) => {
            // shipCards.push(<ShipCard key={ship.title} ship={ship} />)
        });
    
    return (
        <PaginatedItems items={data.vehicles} itemsPerPage={3} />
    )
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
