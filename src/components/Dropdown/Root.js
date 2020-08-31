import React, { useContext, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { Context } from './Provider';
import { DropdownSection } from './Section';

const refDuration = 0.22

export function DropdownRoot() {
    const { options, cachedId, getOptionById, targetId, setTargetId } = useContext(Context)

    const cachedOption = useMemo(() => getOptionById(cachedId), [
        cachedId,
        getOptionById
    ])



    const [hovering, setHovering] = useState(false)

    const isActive = targetId !== null || hovering

    let [width, height, x] = [0, 0, 0]

    if (cachedOption) {
        const { optionCenterX, contentDimensions } = cachedOption

        width = contentDimensions?.width
        height = contentDimensions?.height
        x = optionCenterX - width / 2
    }

    /**First interation */

    const [hasInteracted, setHasInterected] = useState(false)
    const isFisrtInteraction = isActive && !hasInteracted

    if (isFisrtInteraction) {
        setTimeout(() => {
            if (!hasInteracted) setHasInterected(true)
        }, 15);
    }

    /**Hover timeout */
    useEffect(()=> {
        if(isActive) return;

        let timeout = setTimeout(
            () => setHasInterected(false), refDuration * 1000 * 0.9
        );

        return () => clearTimeout(timeout)
    },[isActive])


    return (
        <div style={{perspective: 2000}}>
            <motion.div
                className="dropdown-root"
                animate={{
                    opacity: isActive ? 1 : 0,
                    rotateX: isActive? 0 : -15
                }}
                onHoverEnd={() => setTargetId(null)}
                transition={{
                    opacity: { duration: refDuration, delay: 0.05 },
                    rotateX: { duration: refDuration, delay: 0.05 },
                }}
            >
                <motion.div
                    className="dropdown-container"
                    animate={{
                        x,
                        width,
                        height,
                        pointerEvents: isActive ? 'unset' : 'none'
                    }}
                    transition={{
                        ease: 'easeOut',
                        x: isFisrtInteraction ? { duration: 0 } : refDuration,
                        width: { duration: isFisrtInteraction ? 0 : refDuration * 0.93 },
                        height: { duration: isFisrtInteraction ? 0 : refDuration * 0.93 },
                        pointerEvents: { delay: 0.05 }
                    }}
                    onHoverStart={() => setHovering(true)}
                    onHoverEnd={() => setHovering(false)}
                >
                    <DropdownBackground/>
                    <motion.div
                        animate={{
                            x: -x,
                        }}
                        transition={{
                            x: isFisrtInteraction ? { duration: 0 } : undefined
                        }}
                    >
                        {options.map(item => <DropdownSection key={item.id} option={item} />)}
                    </motion.div>
                </motion.div>
                <DropdownArrow isFisrtInteraction={isFisrtInteraction} />
            </motion.div>
        </div>
    );
}

function DropdownArrow({ isFisrtInteraction }) {
    const { cachedId, getOptionById } = useContext(Context)

    const cachedOption = useMemo(() => getOptionById(cachedId), [
        cachedId,
        getOptionById
    ])

    const x = cachedOption ? cachedOption.optionCenterX : 0

    return (
        <motion.div
            className="dropdown-arrow"
            initial={{
                opacity: 0,
            }}
            animate={{
                x,
                pointerEvents: 'none',
                opacity: x > 0 ? 1 : 0
            }}
            transition={{
                ease: 'easeOut',
                x: { duration: isFisrtInteraction ? 0 : refDuration }
            }}
        />
    )
}

export function DropdownBackground(){
    const {cachedId, getOptionById} = useContext(Context)

    const cachedOption = useMemo(() => getOptionById(cachedId), [
        cachedId,
        getOptionById
    ])
    
    const backgroundHeight = cachedOption?.backgroundHeight || 0
    return (
        <motion.div
            className="dropdown-background"
            animate={{
                height: backgroundHeight
            }}
            transition={{
                ease: 'easeOut',
                duration: refDuration
            }}
        />
    )
}