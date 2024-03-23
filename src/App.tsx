import React from 'react';
import './App.css';
import {Box, Button, useColorModeValue} from "@chakra-ui/react";
import Segmented from "./packages/components/segments/Segmented";

const COLOR_MODE_LIST = [{label: 'Light', value: 'light',}, {label: 'Dark', value: 'dark',}];

function App() {

    const segmentBlueControl = useColorModeValue('blue.500', 'blue.400');

    return (
        <Box>
            <Segmented
                name={'color-mode'}
                segments={COLOR_MODE_LIST}
                containerConfig={{
                    mt: '1rem'
                }}
                controlConfig={{
                    background: segmentBlueControl
                }}
                activeLabelConfig={{
                    color: 'white'
                }}
            />
        </Box>
    );
}

export default App;
