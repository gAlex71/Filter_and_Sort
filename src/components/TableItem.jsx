import React from "react";

const TableItem = (props) => {
    return(
        <tr>
            <td>{props.item.data}</td>
            <td>{props.item.name}</td>
            <td>{props.item.amount}</td>
            <td>{props.item.distance}</td>
        </tr>
    )
}

export default TableItem