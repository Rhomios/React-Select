import React, {useEffect, useState} from 'react';
import './Styles/dropdown-styles.sass'
import SearchInput from "./SearchInput";
const DropdownSelect = ({options, Multiple = false, Search = false, onSelect, size = '', ...props}) => {
    const [optionList, setOptionList] = useState([])          // состояние списка всех опций, нужен для сортировки
    const [selectedItems, setSelectedItems] = useState([])    // состояние списка выбранных опций
    const [isOpen, setIsOpen] = useState(false)             // состояние меню: открыто, закрыто

    // хук, проверяющий если в пропсе options имеются данные и если да, то
    // записываем данные из него в состояние optionList
    useEffect(() => {
        if(options.length !== 0){
            setOptionList(options)
        }
    }, []);

    // Хук, отслеживающий изменения в массиве выбранных опций, и если у нас активирован пропс-callback onSelect, то
    // выполняет его передавая в качестве аргумента массив выбранных опций
    useEffect(() => {
        if(onSelect) {
            onSelect(selectedItems)
        }
    }, [selectedItems]);

    // функция для поиска опций в списке опций
    // срабатывает если длинна введенного кста не равна нулю
    // каждое поле value ищет по "регулярному выражению"
    const handleSearch = (searchValue) => {
        if (searchValue.length !== 0) {
            const searchRecords = optionList.filter(i => i.value.toString().search(new RegExp(searchValue)) !== -1)
            setOptionList(searchRecords)
        }
    }

    // очищает результаты поиска
    const clearResult = () => {
        setOptionList(options)
    }

    // Функция для добавления опции в массив выбранных опций, в качестве аргумента принимает саму опцию
    // проверяет активирован ли у нас пропс Multiple(Множественный), если да - добавляет опцию к предыдущему состоянию
    // иначе перезаписывает состояние эти элементом
    const addSelected = (item) => {
        if (Multiple === true) {
            setSelectedItems(prevState => ([...prevState, item]))
        } else {
            setSelectedItems([item])
        }
    }

    // удаляет только опцию, переданную в качестве аргумента
    const removeSelected = (item) => {
        setSelectedItems(prevState => ([...prevState].filter(i => i !== item)))
    }

    // очищает массив выбранных опций
    const clearSelected = () => {
        setSelectedItems([])
    }

    // Функция для списка опций, если опция уже есть в массиве выбранных опций - удаляет ее из этого массива, иначе - добавляет.
    const handleSelection = (item) => {
        if (isInArray(selectedItems, item)) {
            removeSelected(item)
        } else {
            addSelected(item)
        }
    }

    // Функция для проверки наличия объекта в массиве, в качестве аргументов принимает сам массив и искомый элемент
    const isInArray = (arr, item) => {
        if(arr.filter(x => x === item).length !== 0) {
            return true
        } else {
            return false
        }
    }

    const onBlurHandler = (e) => {
        if(!e.currentTarget.contains(e.relatedTarget)) {
            setIsOpen(false)
        }
    }

    return (
        <div
            className={`dropdown-container ${size || ''}`}
            {...props}
            tabIndex={0}
            onBlur={e => onBlurHandler(e)}
        >
         <div className={`dropdown-button ${size || ''}`}
              onClick={() => setIsOpen(!isOpen)}
         >
             <div className="selected-items-container">
                 {selectedItems.length === 0 &&
                     <div className={`dropdown-placeholder ${size || ''}`}>
                         Select...
                     </div>
                 }
                 {Multiple === true ?
                     <>
                         {selectedItems.map((i) => (
                             <div key={i.value} className="selected-item">
                                 <div className={`selected-item-value ${'' || ''}`}>
                                     {i.value}
                                 </div>
                                 <div className={`selected-item-remove-btn ${'' || ''}`}
                                      onClick={e => (removeSelected(i), e.stopPropagation())}
                                 >
                                     <div className={`remove-sign ${'' || ''}`}/>
                                 </div>
                             </div>
                            )
                         )}
                     </>
                     :
                     <div>
                         {selectedItems.length > 0 && `${selectedItems[0].value}`}
                     </div>
                 }
             </div>
              <div className="selected-items-options">
                  <div className="selected-items-clear-btn"
                       onClick={e => (clearSelected(), e.stopPropagation())}
                  >
                      <div className="remove-sign"/>
                  </div>
                <div className="dropdown-indicator">
                  <div className="arrow--down" />
                </div>
              </div>
            </div>
            {isOpen &&
                <div className="dropdown-menu-container">
                    <ul className="dropdown-menu-options">
                        {Search === true &&
                            <SearchInput
                                Value={handleSearch}
                                Clear={clearResult}
                            />
                        }
                        {optionList.map(i =>
                            <li
                                key={i.value}
                                onClick={() => handleSelection(i)}
                                className={`dropdown-option-item ${isInArray(selectedItems, i) && 'dropdown-button-active'}`}
                            >
                                {i.value}
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    );
};

export default DropdownSelect;
