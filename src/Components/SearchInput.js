import React, {useState} from 'react';
import "./Styles/search-styles.sass"
import SearchIcon from "../Static/icons8-search.svg"
const SearchInput = ({Value, Clear, ...props}) => {
    const [value, setValue] = useState('')

    const handleSubmit = () => {
        Value(value)
    }

    const handleClear = () => {
        setValue('')
        Clear()
    }

    return (
        <div {...props} className="search-input-container">
            <input
                className="search-input"
                placeholder="Search..."
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <div className="search-clear-btn"
                 onClick={() => handleClear()}
            >
                <div className="remove-sign"/>
            </div>
            <button className="search-button"
                    onClick={() => handleSubmit()}
            >
                <img className="search-icon" src={SearchIcon}/>
            </button>
        </div>
    );
};

export default SearchInput;