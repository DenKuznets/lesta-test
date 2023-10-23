"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ItemsComponent } from "@/components/ItemsComponent";

const client = new ApolloClient({
    uri: "https://vortex.korabli.su/api/graphql/glossary/",
    cache: new InMemoryCache(),
});

export default function Home() {
    return (
        <ApolloProvider client={client}>
            <main className="flex min-h-screen flex-wrap items-center justify-between p-4">
                <ItemsComponent />
            </main>
        </ApolloProvider>
    );
}
