import React, { useState } from 'react'
import TableBody from '../TableBody/TableBody';
import './Table.css';
const Table = ({excelData,filterByName}) => {
  const [batchData,setBatchData]= useState(false);
  return (
    <>  
        {batchData && <button className='back-button' onClick={(prev)=>setBatchData(!prev)}>back</button>}
        <table>
            <thead>
                <tr>
                    { excelData[0].slice(1,9).map((heading,index)=>{
                        return <th key={index}>{heading}</th>;
                    })}
                </tr>
            </thead>
            {<TableBody batchData={batchData}  setBatchData={setBatchData} data={excelData} filterByName={filterByName}/>}
            
        </table>
        
    </>
  )
}

export default Table;
