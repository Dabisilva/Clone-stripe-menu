import React from 'react';

// import { Container } from './styles';

export function DropdownOption({name, content: Content}) {
    return (
        <button className="dropdown-option">{name}</button>
    )
}