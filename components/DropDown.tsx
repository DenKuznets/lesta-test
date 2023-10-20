import React from "react";

interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
    items: string[];
    handleItemClick?: (item: string) => void;
}

const DropDown = ({ handleItemClick, items, children }: DropDownProps) => {
    
    const listItems = items.map((item) => (
        <li key={item}>
            <a onClick={() => handleItemClick && handleItemClick(item)}>
                {item}
            </a>
        </li>
    ));
    return (
        <details className="dropdown mb-32">
            <summary className="m-1 btn">{children}</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                {listItems}
            </ul>
        </details>
    );
};

export default DropDown;
