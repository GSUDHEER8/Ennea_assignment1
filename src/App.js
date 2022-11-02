import {  useState } from 'react';
import readXlsxFile from 'read-excel-file'
import Table from './components/ExcelTable/Table';
import debounce from 'lodash.debounce';
import './App.css'
function App() {
  
  const [excelData,setExcelData] = useState([]);
  const [filterByName,setFilterByName] = useState("");

  const getFileHandler=(e)=>{
    const input=document.getElementById("file");
    readXlsxFile(input.files[0]).then((rows) => {
      setExcelData(rows);
      // console.log(rows.slice(1).length)
    })
  }

  const filterByNameHandler=(e)=>{
    setFilterByName(e.target.value);
    console.log(e.target.value);
  }
  
  const filterByDebounceNameHandler=debounce(filterByNameHandler,300);
  
  return (
    <div className="App">
       <div className='header-container'>
            <div className='upload-file-container'>
                  <div className='upload-file-text'>upload file</div>
                  <input onChange={getFileHandler} type="file" id="file"accept=".xlsx" />
            </div>
            <div className='search-container topnav'>
                  <input type="text"  placeholder="search by name" onChange={filterByDebounceNameHandler} />
            </div>
       </div>
      
      {excelData.length!==0 && <Table excelData={excelData} filterByName={filterByName} />}
    </div>
  );
}

export default App;
