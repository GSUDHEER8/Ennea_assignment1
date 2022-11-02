import React from 'react'

const BatchData = ({batchValues}) => {
   
  return (
    <>
      <tr>
             
            <td>{batchValues[0].name}</td>
            <td>{batchValues[0].batch}</td>
            <td>{batchValues[0].stock}</td>
            <td>{batchValues[0].deal}</td>
            <td>{batchValues[0].free}</td>
            <td>{batchValues[0].mrp}</td>
            <td>{batchValues[0].rate}</td>
            <td>{batchValues[0].exp.toLocaleDateString()}</td>
      </tr>

    </>
  )
}

export default BatchData
