import css from "./SearchBox.module.css"
import React from "react";


export interface SearchBoxProps {
   onSearch: (search: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        onSearch(searchValue);
    }

    return (
            <input
                className={css.input}
                type="text"
                placeholder="Search notes"
                onChange={handleChange}
            />
    )
}