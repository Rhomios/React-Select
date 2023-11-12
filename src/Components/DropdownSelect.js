import React, {useEffect, useState} from 'react';
import './Styles/dropdown-styles.sass'
import DropdownOption from "./DropdownOption";
import SearchInput from "./SearchInput";
const DropdownSelect = ({options, Multiple = false, Search = false, onSelect}) => {
    const [onHide, setOnHide] = useState(false)             // state of the value list
    const [optionList, setOptionList] = useState([])          // state of mutable options
    const [selectedItems, setSelectedItems] = useState([])    // state of selected items, unique only

    // useEffect hook for updating optionList state
    useEffect(() => {
        setOptionList(options)
    }, []);

    const handleSearch = (searchValue) => {
        if (searchValue.length !== 0) {
            const searchRecords = optionList.filter(i => i.value.toString().search(new RegExp(searchValue)) !== -1)
            setOptionList(searchRecords)
        }
    }

    const clearResult = () => {
        setOptionList(options)
    }

    const addSelected = (item) => {
        if (Multiple) {
            setSelectedItems(prevState => ([...prevState, item]))
        } else {
            setSelectedItems([item])
        }
    }

    const removeSelected = (item) => {
        setSelectedItems(prevState => ([...prevState].filter(d => d !== item)))
    }

    const handleSelection = (item) => {
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
                 {selectedItems.length === 0 && <div className="dropdown-default-container">Select...</div>}
                 {
                     Multiple ?
                         <>
                             {
                                 selectedItems.map((i) => (
                                     <div key={i.value} className="selected-item">
                                         <div className="selected-item-value">
                                             {i.value}
                                         </div>
                                         <div className="selected-item-remove-btn" onClick={() => removeSelected(i)}>
                                             <div className="small-x"/>
                                         </div>
                                     </div>
                                 ))
                             }
                         </>
                         :
                         <div>
                             {selectedItems.length > 0 && `${selectedItems[0].value}`}
                         </div>
                 }
             </div>
              <div className="selected-items-options">
                <div className="dropdown-indicator">
                  <div className="arrow--down" />
                </div>
              </div>
            </div>
            <div className="dropdown-list-container" style={{visibility: onHide ? "visible": "hidden"}}>
                <SearchInput Value={handleSearch}/>
                {optionList.map(i =>
                    <DropdownOption key={i.value} onClick={() => handleSelection(i)} active={selectedItems.filter(x => x === i).length !== 0 && true} >
                        {i.value}
                    </DropdownOption>
                )}
            </div>
        </div>
    );
};

export default DropdownSelect;
