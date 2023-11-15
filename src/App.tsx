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
        <div style={{height: '100vh', width: '100vh', display: 'flex'}}>
          <div style={{width: 500, height: '100%', margin: 5}}>
            <div style={{marginTop: 5}}>
              <span style={{fontSize: 24, fontFamily: 'Arial'}}>Селект со множественным выбором:</span>
              <DropdownSelect options={array} Multiple={true}/>
            </div>
            <div style={{marginTop: 5}}>
              <span style={{fontSize: 24, fontFamily: 'Arial', marginTop: 5}}>Селект с поиском:</span>
              <DropdownSelect options={array} Search={true}/>
            </div>
            <div style={{marginTop: 5}}>
              <span style={{fontSize: 24, fontFamily: 'Arial'}}>Селект с поиском и множественным выбором:</span>
              <DropdownSelect options={array} Search={true} Multiple={false}/>
            </div>
          </div>

          <div style={{width: 500, height: '100%', margin: 5}}>
            <div style={{marginTop: 5}}>
              <span style={{fontSize: 24, fontFamily: 'Arial'}}>Селект size: large</span>
              <DropdownSelect options={array} Multiple={true} size='large'/>
            </div>
            <div style={{marginTop: 5}}>
              <span style={{fontSize: 24, fontFamily: 'Arial', marginTop: 5}}>Селект size: small</span>
              <DropdownSelect options={array} size='small'/>
            </div>
            <div style={{marginTop: 5}}>
              <span style={{fontSize: 24, fontFamily: 'Arial'}}>Селект variant: info</span>
              <DropdownSelect options={array} Search={true} variant='info'/>
            </div>
            <div style={{marginTop: 5}}>
              <span style={{fontSize: 24, fontFamily: 'Arial'}}>Селект variant: warning</span>
              <DropdownSelect options={array} Search={true} variant='warning'/>
            </div>
            <div style={{marginTop: 5}}>
              <span style={{fontSize: 24, fontFamily: 'Arial'}}>Селект variant: danger</span>
              <DropdownSelect options={array} Search={true} variant='danger'/>
            </div>
          </div>

        </div>


      </div>
  );
}

export default App;
