import React, {useState} from 'react';
import './Styles/dropdown-styles.sass'
import DropdownOption from "./DropdownOption";
const DropdownSelect = ({options, isMultiple = false, Search = false, onSelect}) => {
    const [onHide, setOnHide] = useState(false)             // state of the value list
    const [selectedItems, setSelectedItems] = useState([])    // state of selected items, unique only

    console.log(selectedItems.filter(x => x === options[0]))

    const addSelected = (item) => {
    }

    const removeSelected = (item) => {
    }

    const performClick = (item) => {

        const candidate = selectedItems.filter(i => i === item)

        if (candidate.length === 0) {
            setSelectedItems(prevState => ([...prevState, item]))
        } else {
            setSelectedItems(prevState => ([...prevState].filter(d => d !== item)))
        }
    }

    return (
        <div className="dropdown-core">
            <div className="dropdown-container">
                <div className="selected-items-container">
                    {selectedItems.map(i => <div key={i.value} className="selectedItem">{i.value}</div>)}
                </div>
                <button className="dropdown-button" onClick={() => setOnHide(!onHide)}>

                </button>
            </div>


            <div className="dropdown-list" style={{visibility: onHide ? "visible": "hidden"}}>
                {
                    Search &&
                    <div>
                        <input></input>
                    </div>
                }
                {options.map(i =>
                    <DropdownOption key={i.value} onClick={() => performClick(i)} active={selectedItems.filter(x => x === i).length !== 0 && true} >
                        {i.value}
                    </DropdownOption>
                )}
            </div>

        </div>
    );
};

export default DropdownSelect;