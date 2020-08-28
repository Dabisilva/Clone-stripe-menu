import React, { createContext, useState, useCallback, useEffect } from 'react';

const Context = createContext()

export function DropdownProvider({ children }) {
    const [options, setOptions] = useState([])
    const [targetId, setTargetId] = useState(null)
    const [cachedId, setChadedId] = useState(null)

    const registerOption = useCallback(({
        id,
        optionDimensions,
        optionCenterX,
        WrappedContent,
        backgroundHeight
    }) => {
        setOptions(item => [
            ...item,
            {
                id,
                optionDimensions,
                optionCenterX,
                WrappedContent,
                backgroundHeight
            }
        ])
    }, [setOptions])

    const updateOptionsProps = useCallback((optionId, props) => {
        setOptions(items => 
            items.map(item => {
                if(item.id === optionId){
                    item = {...item, ...props}
                }

                return item
            })    
        )
    }, [setOptions])

    const getOptionById = useCallback((id) => {
        options.find((item) => item.id === id)
    },[options])


    const deleteOptionById = useCallback((id) => {
        setOptions(item => item.filter(item=> item.id !== id))
    }, [setOptions])

    useEffect(() => {
        if(targetId != null)setChadedId(targetId)
    },[targetId])

    return (
        <Context.Provider
            value={{
                registerOption,
                updateOptionsProps,
                getOptionById,
                deleteOptionById,
                options,
                targetId,
                setTargetId,
                cachedId,
                setChadedId
            }}
        >
            {children}
        </Context.Provider>
    )
}