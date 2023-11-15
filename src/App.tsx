import React from 'react';
import DropdownSelect from "./Components/DropdownSelect";

function App() {

  const array: any[] = [
    {id: 1, value: "JavaScript"},
    {id: 2, value: "Php"},
    {id: 3, value: "C#"},
    {id: 5, value: "Java"},
    {id: 6, value: "Python"},
    {id: 7, value: "Typescript"},
    {id: 8, value: "SQL"}
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
