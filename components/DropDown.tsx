"use client";
import React, { useRef } from "react";

interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
    items: string[];
    handleClick?: (item: string) => void;
}

const DropDown = ({
    handleClick: handleClick,
    items,
    children,
}: DropDownProps) => {
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const handleItemClick = (item: string) => {
        handleClick && handleClick(item);
        detailsRef.current && detailsRef.current.removeAttribute("open");
    };
    const listItems = items.map((item) => (
        <li key={item}>
            <a onClick={() => handleClick && handleItemClick(item)}>{item}</a>
        </li>
    ));
    return (
        <details ref={detailsRef} className="dropdown mb-32">
            <summary className="m-1 btn">{children}</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                {listItems}
            </ul>
        </details>
    );
};

export default DropDown;
