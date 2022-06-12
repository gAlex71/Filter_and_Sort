import React from "react";

const MySelect = ({options, defaultValue, value, onChange}) => {
    return(
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            {/* Дефолтный пункт у нас не активен */}
            <option disabled value="">{defaultValue}</option>
            {/* Добавляем остальные методы сортировки */}
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>    
            )}
        </select>
    )
}

export default MySelect