import React from 'react';

import { DropdownProvider, DropdownOption, DropdownRoot } from '../Dropdown'

import { Company, Developers, Products } from '../Content'
import { Container, DropDownStyles } from './styles';

function Navbar() {
    return (
        <>
            <DropdownProvider>
                <DropDownStyles>
                    <Container>
                        <ul>
                            <li>
                                <DropdownOption
                                    name="Produtos"
                                    content={Products}
                                    backgroundHeight={286}
                                />
                            </li>

                            <li>
                                <DropdownOption
                                    name="Desenvolvedores"
                                    content={Developers}
                                    backgroundHeight={167}
                                />
                            </li>

                            <li>
                                <DropdownOption
                                    name="Empresa"
                                    content={Company}
                                    backgroundHeight={286}
                                />
                            </li>
                        </ul>
                    </Container>
                    
                    <DropdownRoot/>
                </DropDownStyles>
            </DropdownProvider>
        </>
    );
}

export default Navbar;