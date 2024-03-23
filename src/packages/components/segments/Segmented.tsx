import React, {useEffect, useRef, useState} from "react";
import {Box, BoxProps, Flex, FlexProps, useColorModeValue} from "@chakra-ui/react";
import {StyleProps} from "@chakra-ui/styled-system";

interface SegmentState {
    value: string
    label: string
}

interface SegmentedProps {
    name: string
    segments: SegmentState[]
    onChangeSegment?: (s: SegmentState, i: number) => void
    defaultIndex?: number
    controlRef?: any
    config?: FlexProps
    containerConfig?: BoxProps
    controlConfig?: StyleProps
    labelConfig?: StyleProps
    activeLabelConfig?: StyleProps
    value?: number
}

const Segmented = ({
                       name,
                       segments,
                       onChangeSegment,
                       defaultIndex = 0,
                       config,
                       controlRef = useRef(),
                       containerConfig,
                       controlConfig,
                       labelConfig,
                       activeLabelConfig,
                       value
                   }: SegmentedProps) => {

    const newSegments = segments.map((s) => ({...s, ref: useRef<HTMLDivElement>()}));
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const componentReady = useRef<boolean>(false);

    const boxShadowColor = useColorModeValue('rgba(0,0,0,0.3)', 'rgba(256,256,256,0.2)');
    const globalText = useColorModeValue('black', 'white');
    const segmentContainer = useColorModeValue('gray.200', 'gray.700');
    const segmentControl = useColorModeValue('white', 'gray.600');

    useEffect(() => {
        componentReady.current = true;
    }, [])

    const onInputChange = (value: SegmentState, index: number) => {
        setActiveIndex(index);
        !!onChangeSegment && onChangeSegment(value, index);
    }

    useEffect(() => {
        const activeSegmentRef = newSegments[value ?? activeIndex].ref;
        if (!!activeSegmentRef.current) {
            const {offsetWidth, offsetLeft} = activeSegmentRef.current;
            const {style} = controlRef.current;

            style.setProperty('--highlight-width', `${offsetWidth}px`);
            style.setProperty('--highlight-x-pos', `${offsetLeft}px`);
        }
    }, [activeIndex, onChangeSegment, newSegments, value])

    return (
        <Flex
            {...config}
            className={'controls-container'}
            ref={controlRef}
            css={{
                '--highlight-width': 'auto',
                '--highlight-x-pos': 0,
            }}
        >
            <Box
                className={`controls`}
                display={'inline-flex'}
                justifyContent={'space-between'}
                backgroundColor={segmentContainer}
                boxShadow={`inset 0 0 5px ${boxShadowColor}`}
                borderRadius={'0.4rem'}
                px={'2px'}
                // m={'auto'}
                overflowY={'hidden'}
                position={'relative'}
                {...containerConfig}
                sx={{
                    input: {
                        opacity: 0,
                        margin: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        position: 'absolute',
                        width: '100%',
                        cursor: 'pointer',
                        height: '100%'
                    },
                    '.segment label': {
                        color: globalText,
                        cursor: 'pointer',
                        display: 'block',
                        fontWeight: 700,
                        padding: '8px',
                        position: 'relative',
                        transition: 'color 0.5s ease',
                        fontSize: '14px',
                        ...labelConfig
                    },
                    '.segment.active label': {
                        color: globalText,
                        ...activeLabelConfig
                    }
                }}
                _before={{
                    content: '""',
                    background: segmentControl,
                    borderRadius: '0.4rem',
                    width: 'var(--highlight-width)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    transform: 'translateX(var(--highlight-x-pos))',
                    position: 'absolute',
                    top: '2px',
                    bottom: '2px',
                    left: 0,
                    zIndex: 0,
                    ...controlConfig,
                    transition: !!componentReady.current ? 'transform 0.3s ease, width 0.3s ease' : ''
                }}
            >
                {
                    newSegments.map((item, i) => (
                        <Box
                            key={item.value}
                            className={`segment ${i === (value ?? activeIndex) ? 'active' : 'inactive'}`}
                            // @ts-ignore
                            ref={item.ref}
                            minW={'100px'}
                            position={'relative'}
                            textAlign={'center'}
                            zIndex={1}
                        >
                            <input
                                type={'radio'}
                                id={item.label + name}
                                value={item.value}
                                name={name}
                                onChange={() => onInputChange(item, i)}
                                checked={i === (value ?? activeIndex)}
                            />
                            <label htmlFor={item.label + name}>
                                {item.label}
                            </label>
                        </Box>
                    ))
                }
            </Box>
        </Flex>
    )
}

export default Segmented;