import React, {useState} from 'react';
import './Styles/dropdown-styles.sass'

const DropdownOption = ({active = false, ...props}) => {

    return (
        <div {...props} className={`dropdown-list-item ${props.className} ${active && 'dropdown-button-active' }`}>
            {props.children}
        </div>
    );
};
//{` ${} ' }
export default DropdownOption;