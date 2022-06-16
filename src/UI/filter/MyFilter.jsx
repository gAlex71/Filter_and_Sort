import React from "react";
import classes from "./MyFilter.module.css"

const MyFilter = ({options, defaultValue, value, onChange}) => {
    return(
        <div className={classes.filter__section}>
            <select 
                value={value}
                onChange={event => onChange(event.target.value)}
                className={classes.form__control}
            >
              <option disabled value="">{defaultValue}</option>
              {/* Проходимся по массиву опций */}
              {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>    
            )}
            </select>
        </div>
    )
}

export default MyFilter