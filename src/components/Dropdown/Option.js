import React, { useRef, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion'
import { useDimensions } from './dimensions';
import { Context } from './Provider';

let lastOptionID = 0

export function DropdownOption({ name, content: Content, backgroundHight }) {
    const idRef = useRef(++lastOptionID)
    const id = idRef.current

    const [optionHook, optionDimensions] = useDimensions()
    const [registered, setRegistered] = useState(false)

    const {
        registerOption,
        updateOptionProps,
        deleteOptionById,
        setTargetId,
        targetId
    } = useContext(Context)

    const handleOpen = () => setTargetId(id)
    const handleClose = () => setTargetId(null)
    const handleTouch = () => (window.isMobile = true)

    const handleCLick = (e) => {
        e.preventDefault();

        return targetId === id ? handleClose() : handleOpen()
    }

    useEffect(() => {
        if (!registered && optionDimensions) {
            const WrappedContent = () => {
                const contentRef = useRef()

                useEffect(() => {
                    const contentDimensions = contentRef.current.getBoundingClientRect()
                    updateOptionProps(id, { contentDimensions })
                }, [])

                return (
                    <div ref={contentRef}>
                        <Content />
                    </div>
                )
            }

            registerOption({
                id,
                optionDimensions,
                optionCenterX: optionDimensions.x + optionDimensions.width / 2,
                WrappedContent,
                backgroundHight,
            })

            setRegistered(true)
        } else if (registered && optionDimensions) {
            updateOptionProps(id, {
                optionDimensions,
                optionCenterX: optionDimensions.x + optionDimensions.width / 2,
            })
        }
    }, [
        registerOption,
        id,
        registered,
        optionDimensions,
        updateOptionProps,
        deleteOptionById,
        backgroundHight
    ])

    useEffect(()=> deleteOptionById(id), [deleteOptionById, id])

    return (
        <motion.button
            className="dropdown-option"
            ref={optionHook}
            onMouseDown={handleCLick}
            onHoverStart={() => !window.isMobile && handleOpen()}
            onHoverEnd={() => !window.isMobile && handleOpen()}
            onTouchStart={handleTouch}
            onFocus={handleOpen}
            onBlur={handleClose}
        >
            {name}
        </motion.button>
    )
}