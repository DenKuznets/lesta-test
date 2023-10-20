import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import ReactPaginate from "react-paginate";

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

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

interface Ship {
    title: string;
    level: string;
    nation: {
        name: string;
    };
    type: {
        name: string;
    };
    description: string;
    icons: {
        large: string;
        medium: string;
    };
}

const ShipCard = ({ ship }: { ship: Ship }) => {
    return ship ? (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                {ship.icons && (
                    <img
                        // width={400}
                        // height={300}
                        src={ship.icons.large}
                        alt="Ship image"
                    />
                )}
            </figure>

            <div className="card-body">
                <h2 className="card-title">{`Название: ${ship.title}`}</h2>
                <p>{`Уровень: ${ship.level}`}</p>
                <p>{`Страна: ${ship.nation.name}`}</p>
                <p>{`Тип: ${ship.type.name}`}</p>
                <p>{ship.description}</p>
            </div>
        </div>
    ) : (
        <span className="loading loading-ring loading-lg"></span>
    );
};

function Items({ currentItems }: { currentItems: Ship[] }) { 
    
    
    return (
        <div className="flex">
            {currentItems &&
                currentItems.map((ship: Ship) => (
                    <ShipCard key={ship.title} ship={ship} />
                    ))}
        </div>
    );
}

export function PaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
    const { loading, error, data } = useQuery(GET_SHIPS);
    const [itemOffset, setItemOffset] = useState(0);
    if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return <p>Error : {error.message}</p>;
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const items = data.vehicles;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                className="flex mx-auto mt-4 gap-2 [&>ul]:flex [&>ul]:gap-2 [&_.selected]:bg-orange-500 [&_.selected]:text-zinc-800 [&_li>a]:p-1 [&_li]:border [&_li]:border-r-amber-500"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={(e) => handlePageClick(e)}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}
