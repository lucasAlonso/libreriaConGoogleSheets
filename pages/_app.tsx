import React from 'react';
import {
    Box,
    ChakraProvider,
    Container,
    Divider,
    VStack,
    Image,
    Heading,
    Text,
} from '@chakra-ui/react';
import { AppProps } from 'next/app';

import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <Box padding={4}>
                <Container
                    backgroundColor="white"
                    boxShadow="md"
                    borderRadius="sm"
                    marginY={4}
                    maxWidth="container.xl"
                    padding={4}
                >
                    <VStack marginBottom={6}>
                        <Image
                            borderRadius={9999}
                            src="https://via.placeholder.com/128"
                            alt="Logo"
                        />
                        <Heading>La Libreria</Heading>
                        <Text>La libreria bookstore</Text>
                    </VStack>
                    <Divider marginY={6} />
                    <Component {...pageProps} />
                </Container>
            </Box>
        </ChakraProvider>
    );
};

export default App;
