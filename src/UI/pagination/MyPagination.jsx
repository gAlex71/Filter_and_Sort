import React from "react";
import classes from "./MyPagination.module.css"

const MyPagination = ({itemsPerPage, totalItems, currentPage, setCurrentPage}) => {

    let pagesArray = []
    for (let i = 0; i < Math.ceil(totalItems / itemsPerPage); i++) {
        pagesArray.push(i + 1)
    }

    return(
        <div className={classes.page_wrapper}>
          {pagesArray.map(p =>
            <span
              onClick={() => setCurrentPage(p)}
              key={p}
              className={currentPage === p ? classes.page_current : classes.page}>
                {p}
            </span>
          )}
        </div>
    )
}

export default MyPagination