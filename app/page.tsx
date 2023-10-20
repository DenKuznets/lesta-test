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

const client = new ApolloClient({
    // uri: "https://flyby-router-demo.herokuapp.com/",
    uri: "https://vortex.korabli.su/api/graphql/glossary/",
    cache: new InMemoryCache(),
});

export default function Home() {
    return (
        <ApolloProvider client={client}>
            <main className="flex min-h-screen flex-wrap items-center justify-between p-4">
                {/* <DisplayShips /> */}

                <PaginatedItems itemsPerPage={3} />
            </main>
        </ApolloProvider>
    );
}
