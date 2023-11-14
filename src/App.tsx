import React from 'react';
import DropdownSelect from "./Components/DropdownSelect";

function App() {

  const array = [
    {id: 1, value: "Argentine"},
    {id: 2, value: "Russia"},
    {id: 3, value: "USA"},
    {id: 5, value: "Israel"},
    {id: 6, value: "Poland"},
    {id: 7, value: "Lithuania"},
    {id: 8, value: "Canada"}
  ]


  const returnItemList = (i: any) => {
    console.log(i)
  }

  return (
      <div className="App">
        <div style={{width: 500}}>
          <DropdownSelect options={array} Multiple={true}/>
          <DropdownSelect options={array} Search={true}/>
          <DropdownSelect options={array} Search={true} Multiple={false} onSelect={returnItemList}/>

        </div>

      </div>
  );
}

export default App;
