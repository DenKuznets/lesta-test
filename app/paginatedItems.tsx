import ShipCard from "@/components/ShipCard/ShipCard";
import { Ship } from "@/types";
import { useState } from "react";
import ReactPaginate from "react-paginate";

function Items({ currentItems }: { currentItems: Ship[] }) {
    return (
        <div className="flex flex-wrap">
            {currentItems &&
                currentItems.map((ship: Ship) => (
                    <ShipCard key={ship.title} ship={ship} />
                ))}
        </div>
    );
}

export function PaginatedItems({
    items,
    itemsPerPage,
}: {
    items: Ship[];
    itemsPerPage: number;
}) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
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
            <Items currentItems={currentItems} />
        </>
    );
}
