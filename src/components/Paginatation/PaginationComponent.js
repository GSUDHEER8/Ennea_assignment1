import React from 'react'
import Pagination from "react-js-pagination";
import "./PaginationComponent.css"

const PaginationComponent = ({activePage,setActivePage,totalItemsCount}) => {
  console.log("set total item",totalItemsCount);
  return (
    <div className='paginationMainDiv'>
      <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={activePage}
          itemsCountPerPage={20}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={(pageNumber)=>{console.log(`active page is ${pageNumber}`);setActivePage(pageNumber);}}
        />
    </div>
  )
}

export default PaginationComponent
