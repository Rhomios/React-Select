import {useState} from "react";
import DropdownSelect from "./Components/DropdownSelect";

function App() {

  const array = [
      {id: 1, value: "Argentine"},
      {id: 2, value: "Russia"},
      {id: 3, value: "USA"},
      {id: 4, value: "Ukraine"},
      {id: 5, value: "Israel"},
      {id: 6, value: "Poland"},
      {id: 7, value: "Lithuania"},
      {id: 8, value: "Canada"}
  ]
    // console.log(selectedItems.has(array[0]))
    // console.log(selectedItems)


  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div style={{width: 500, height: 500}}>
          <div style={{height: 200}}>

          </div>
          <DropdownSelect options={array} Multiple={true}/>
      </div>
    </div>
  );
}

export default App;
