import React, {useState} from 'react';
import "./Styles/search-styles.sass"
import SearchIcon from "../Static/icons8-search.svg"
const SearchInput = ({Value}) => {
    const [value, setValue] = useState('')

    const handleSubmit = () => {
        Value(value)
    }

    return (
        <div className="search-input-container">
            <input className="search-input" value={value} onChange={e => setValue(e.target.value)} />
            <button className="search-button" onClick={() => handleSubmit()}>
                <img className="search-icon" src={SearchIcon}/>
            </button>
        </div>
    );
};

export default SearchInput;