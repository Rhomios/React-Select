import React, { useState } from "react";
import "./Styles/search-styles.sass";
import SearchIcon from "../Static/icons8-search.svg";

interface Props {
  onSearch: (value: string) => any;
  onClear: () => any;
  variant?: string;
}

const SearchInput: React.FC<Props> = ({
  onSearch,
  onClear,
  variant = "",
  ...props
}: Props) => {
  const [value, setValue] = useState<string>("");
  const handleSubmit = () => {
    onSearch(value);
  };

  const handleClear = () => {
    setValue("");
    onClear();
  };

  return (
    <div {...props} className="search-input-container">
      <input
        className={`search-input ${variant || ""}`}
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <div
          className={`search-clear-btn ${variant || ""}`}
          onClick={() => handleClear()}
        >
          <div className="remove-sign" />
        </div>
      )}
      <button
        className={`search-button ${variant || ""}`}
        onClick={() => handleSubmit()}
      >
        <img className={`search-icon ${variant || ""}`} src={SearchIcon} />
      </button>
    </div>
  );
};

export default SearchInput;
