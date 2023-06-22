import React from 'react';
import DropdownButton from './DropdownButton';

const DropButton =()=>{
    const options = ['Opción 1', 'Opción 2', 'Opción 3'];
    return(
        <div>
            <DropdownButton options={options} />
        </div>
    )
}