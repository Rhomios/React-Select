import React, { useEffect, useState, FC, FocusEvent } from 'react';
import './Styles/dropdown-styles.sass'
import SearchInput from "./SearchInput";

interface Option {
    value: string,
    icon?: string
}

interface Props {
    options: Option[];
    Multiple?: boolean;
    Search?: boolean;
    onSelect?: (selectedItems: Option[] | undefined) => void;
    size?: string;
    variant?: string;
}

const DropdownSelect: FC<Props> = ({
   options,
   Multiple = false,
   Search = false,
   onSelect,
   size = '',
   variant = '',
   ...props}: Props) => {
    const [optionList, setOptionList] = useState<Option[]>([])          // состояние списка всех опций, нужен для сортировки
    const [selectedItems, setSelectedItems] = useState<Option[]>([])    // состояние списка выбранных опций
    const [isOpen, setIsOpen] = useState<boolean>(false)             // состояние меню: открыто, закрыто

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
    // каждое поле value ищет по "регулярному выражению", + перевожу строки в нижний регистр, дабы функция гарантировано выполнялась корректно.
    const handleSearch = (searchValue: string) => {
        if (searchValue.length !== 0) {
            let searchRecords: Option[]
            searchRecords = options.filter(i => i.value.toString().toLowerCase().search(new RegExp(searchValue.toLowerCase())) !== -1)
            // сортировка запросу, по-большей части нужно чтобы при вводе 'p' впервых рядах выводились значения по типу "php, python и т.д."
            searchRecords.sort((a: Option, b: Option) => {
                if (a.value.toLowerCase().startsWith(searchValue.toLowerCase()))  {
                    return -1
                } else if (!b.value.toLowerCase().startsWith(searchValue.toLowerCase())) {
                    return 1
                } else {
                    return 0
                }
            })
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
    const addSelected = (item: Option) => {
        if (Multiple === true) {
            setSelectedItems(prevState => ([...prevState, item]))
        } else {
            setSelectedItems([item])
        }
    }

    // удаляет только опцию, переданную в качестве аргумента
    const removeSelected = (item: Option) => {
        setSelectedItems(prevState => ([...prevState].filter(i => i !== item)))
    }

    // очищает массив выбранных опций
    const clearSelected = () => {
        setSelectedItems([])
    }

    // Функция для списка опций, если опция уже есть в массиве выбранных опций - удаляет ее из этого массива, иначе - добавляет.
    const handleSelection = (item: Option) => {
        if (isInArray(selectedItems, item)) {
            removeSelected(item)
        } else {
            addSelected(item)
        }
    }

    // Функция для проверки наличия объекта в массиве, в качестве аргументов принимает сам массив и искомый элемент
    const isInArray = (arr: any[], item: any) => {
        if(arr.filter(x => x === item).length !== 0) {
            return true
        } else {
            return false
        }
    }

    // Функция для onBlur, дабы не закрывать меню при потере фокуса при нажатии на внутренние элементы
    const onBlurHandler = (e: FocusEvent) => {
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
         <div className={`dropdown-button ${size || ''} ${variant || ''} `}
              onClick={() => setIsOpen(!isOpen)}
         >
             <div className="selected-items-container">
                 {selectedItems.length === 0 &&
                     <div className={`dropdown-placeholder ${size || ''} ${variant || ''}`}>
                         Select...
                     </div>
                 }
                 {Multiple === true ?
                     <>
                         {selectedItems.map((i) => (
                             <div key={i.value} className={`selected-item ${variant || ''}`}>
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
                     <div className={`selected-item-single ${variant || ''}`}>
                         {selectedItems.length > 0 && `${selectedItems[0].value}`}
                     </div>
                 }
             </div>
              <div className="selected-items-options">
                  <div className={`${'selected-items-clear-btn'} ${variant || ''}`}
                       onClick={e => (clearSelected(), e.stopPropagation())}
                  >
                      <div className="remove-sign"/>
                  </div>
                <div className={`dropdown-indicator ${variant || ''}`}>
                  <div className={`arrow--down ${variant || ''}`} />
                </div>
              </div>
            </div>
            <div className={`dropdown-menu-container ${!isOpen && 'dropdown-menu-container-on-hide'}`}>
                <ul className="dropdown-menu-options">
                    {Search &&
                        <SearchInput
                            Value={handleSearch}
                            Clear={clearResult}
                            variant={variant}
                        />
                    }
                    {optionList.length !== 0 ?
                        <>
                            {optionList.map(i =>
                                <li
                                    key={i.value}
                                    onClick={() => handleSelection(i)}
                                    className={`dropdown-option-item ${isInArray(selectedItems, i) && 'dropdown-button-active'}`}
                                >
                                    {i.icon &&
                                        <div className={'dropdown-option-item-icon-container'}>
                                            <img className={'dropdown-option-item-icon'} src={i.icon}></img>
                                        </div>
                                    }
                                    <span>{i.value}</span>
                                </li>
                            )}
                        </>
                        :
                        <div className={'no-options-warning'}>
                            No options found
                        </div>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DropdownSelect;
