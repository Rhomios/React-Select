import React, {useState} from 'react';
import './Styles/dropdown-styles.sass'
const DropdownSelect = ({options, isMultiple = false, Search = false, onSelect}) => {
    const [onHide, setOnHide] = useState(false)             // state of the value list
    const [selectedItems, setSelectedItems] = useState([])    // state of selected items, unique only

    console.log(selectedItems)

    const addSelected = (item) => {
        setSelectedItems(prevState => ([...prevState, item]))
    }

    const removeSelected = (item) => {
        setSelectedItems(prevState => ([...prevState].filter(d => d !== item)))
    }

    const contains = (value, arr) => {
        arr.find(value)
    }
    const performClick = (item) => {
        const candidate = selectedItems.filter(i => i === item)
        if (candidate.length === 0) {
            addSelected(item)
        } else {
            removeSelected(item)
        }
    }

    return (
        <div className="dropdown-container">
            <button className="dropdown-button" onClick={() => setOnHide(!onHide)}>
                <div className="selected-items-container">
                    {selectedItems.map(i => <div key={i.value} className="selectedItem">{i.value}</div>)}

                </div>
            </button>
            <div className="dropdown-list" style={{visibility: onHide ? "visible": "hidden"}}>
                {
                    Search &&
                    <div>
                        <input></input>
                    </div>
                }
                {options.map(i =>
                    <div key={i.value} className="dropdown-list-item" onClick={() => performClick(i)}>
                        {i.value}
                    </div>
                )}
            </div>

        </div>
    );
};

export default DropdownSelect;