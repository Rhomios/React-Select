import React, {useState} from 'react';
import './Styles/dropdown-styles.sass'
import DropdownOption from "./DropdownOption";
const DropdownSelect = ({options, isMultiple = false, Search = false, onSelect}) => {
    const [onHide, setOnHide] = useState(false)             // state of the value list
    const [selectedItems, setSelectedItems] = useState([])    // state of selected items, unique only

    console.log(selectedItems.filter(x => x === options[0]))

    const addSelected = (item) => {
        setSelectedItems(prevState => ([...prevState, item]))
    }

    const removeSelected = (item) => {
        setSelectedItems(prevState => ([...prevState].filter(d => d !== item)))
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
         <div className="dropdown-button" onClick={() => setOnHide(!onHide)}>
              <div className="selected-items-container">
                {selectedItems.map((i) => (
                  <div key={i.value} className="selected-item">
                      <div className="selected-item-value">
                          {i.value}
                      </div>
                      <div className="selected-item-remove-btn" onClick={() => removeSelected(i)}>
                          <div className="small-x"/>
                      </div>
                  </div>
                ))}
              </div>
              <div className="selected-items-options">
                <div className="dropdown-indicator">
                  <div className="arrow--down" />
                </div>
              </div>
            </div>


            <div className="dropdown-list-container" style={{visibility: onHide ? "visible": "hidden"}}>
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
