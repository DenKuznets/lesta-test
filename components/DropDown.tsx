"use client";
import React, { useRef, useState } from "react";

interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
    filters: string[];
    handleClick?: (filter: string) => void;
}

const DropDown = ({
    handleClick: handleClick,
    filters: items,
    children
}: DropDownProps) => {
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const handleItemClick = (filter: string) => {
        handleClick && handleClick(filter);
        detailsRef.current && detailsRef.current.removeAttribute("open");
    };

    const filtersList = items.map((filter) => (
        <li key={filter}>
            <a onClick={() => handleItemClick(filter)}>{filter}</a>
        </li>
    ));

    return (
        <details ref={detailsRef} className="dropdown">
            <summary className="m-1 btn">{ children }</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                {filtersList}
            </ul>
        </details>
    );
};

export default DropDown;
