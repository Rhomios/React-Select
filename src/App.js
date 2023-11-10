import {useState} from "react";
import DropdownSelect from "./Components/DropdownSelect";

function App() {

  const array = [
      {id: 1, value: "Argentine"},
      {id: 2, value: "Russia"},
      {id: 3, value: "USA"}
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
          <DropdownSelect options={array}/>
      </div>
    </div>
  );
}

export default App;
