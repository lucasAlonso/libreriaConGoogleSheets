import { Button, Flex, Grid, Image, Link, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React from 'react';
import api from '../product/api';
import { Product } from '../product/types';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

interface Props {
    products: Product[];
}
function parseCurrency(value: number): string {
    return value.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });
}

const IndexRoute: React.FC<Props> = ({ products }) => {
    const [cart, setCart] = React.useState<Product[]>([]);
    const text = React.useMemo(
        () =>
            cart
                .reduce(
                    (message, product) =>
                        message.concat(
                            `*${product.nombre} - ${parseCurrency(
                                product.valor
                            )}\n`
                        ),
                    ``
                )
                .concat(
                    `\nTotal: ${parseCurrency(
                        cart.reduce(
                            (total, product) => total + product.valor,
                            0
                        )
                    )}`
                ),
        [cart]
    );

    return (
        <Stack spacing={6}>
            <Grid
                gridGap={6}
                templateColumns="repeat(auto-fill,minmax(240px,1fr))"
            >
                {products.map(
                    (product, index) =>
                        Boolean(product.stock != 0) && (
                            <Stack
                                key={index}
                                backgroundColor="gray.100"
                                borderRadius="md"
                                padding={4}
                                spacing={3}
                            >
                                <Stack spacing={1}>
                                    <Image
                                        cursor="pointer"
                                        borderTopRadius="md"
                                        height={260}
                                        objectFit="cover"
                                        src={product.imagen}
                                        alt={product.nombre}
                                    />
                                    <Text>{product.nombre}</Text>
                                    <Text color="green.500" fontSize="sm">
                                        {parseCurrency(product.valor)}
                                    </Text>
                                </Stack>
                                <Text>Stock: {product.stock}</Text>
                                <Button
                                    onClick={() =>
                                        setCart((cart) => cart.concat(product))
                                    }
                                    size="sm"
                                    colorScheme="primary"
                                >
                                    Agregar
                                </Button>
                            </Stack>
                        )
                )}
            </Grid>
            {Boolean(cart.length) && (
                <Flex
                    alignItems="center"
                    position="sticky"
                    justifyContent="center"
                    bottom={4}
                >
                    <Button
                        isExternal
                        as={Link}
                        padding={4}
                        width="fit-content"
                        colorScheme="whatsapp"
                        href={`https://wa.me/549115454?text=${encodeURIComponent(
                            text
                        )}`}
                    >
                        Finalizar compra! ({cart.length} libros){' '}
                    </Button>
                </Flex>
            )}
        </Stack>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const products = await api.list();
    return {
        props: {
            products,
        },
        revalidate: 10,
    };
};

export default IndexRoute;

/* 
con animaciones, anda lento
import { Button, Flex, Grid, Image, Link, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React from 'react';
import api from '../product/api';
import { Product } from '../product/types';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

interface Props {
    products: Product[];
}
function parseCurrency(value: number): string {
    return value.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });
}

const IndexRoute: React.FC<Props> = ({ products }) => {
    const [cart, setCart] = React.useState<Product[]>([]);
    const [selectedImage, setSelectedImage] = React.useState<string>(null);
    const text = React.useMemo(
        () =>
            cart
                .reduce(
                    (message, product) =>
                        message.concat(
                            `*${product.nombre} - ${parseCurrency(
                                product.valor
                            )}\n`
                        ),
                    ``
                )
                .concat(
                    `\nTotal: ${parseCurrency(
                        cart.reduce(
                            (total, product) => total + product.valor,
                            0
                        )
                    )}`
                ),
        [cart]
    );

    return (
        <AnimateSharedLayout type="crossfade">
            <Stack spacing={6}>
                <Grid
                    gridGap={6}
                    templateColumns="repeat(auto-fill,minmax(240px,1fr))"
                >
                    {products.map(
                        (product, index) =>
                            Boolean(product.stock != 0) && (
                                <Stack
                                    key={index}
                                    backgroundColor="gray.100"
                                    borderRadius="md"
                                    padding={4}
                                    spacing={3}
                                >
                                    <Stack spacing={1}>
                                        <Image
                                            as={motion.image}
                                            cursor="pointer"
                                            borderTopRadius="md"
                                            height={260}
                                            objectFit="cover"
                                            onClick={() =>
                                                setSelectedImage(product.imagen)
                                            }
                                            layoutId={product.imagen}
                                            src={product.imagen}
                                            alt={product.nombre}
                                        />
                                        <Text>{product.nombre}</Text>
                                        <Text color="green.500" fontSize="sm">
                                            {parseCurrency(product.valor)}
                                        </Text>
                                    </Stack>
                                    <Text>Stock: {product.stock}</Text>
                                    <Button
                                        onClick={() =>
                                            setCart((cart) =>
                                                cart.concat(product)
                                            )
                                        }
                                        size="sm"
                                        colorScheme="primary"
                                    >
                                        Agregar
                                    </Button>
                                </Stack>
                            )
                    )}
                </Grid>
                <AnimatePresence>
                    {Boolean(cart.length) && (
                        <Flex
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            as={motion.div}
                            alignItems="center"
                            position="sticky"
                            justifyContent="center"
                            bottom={4}
                        >
                            <Button
                                isExternal
                                as={Link}
                                padding={4}
                                width="fit-content"
                                colorScheme="whatsapp"
                                href={`https://wa.me/549115454?text=${encodeURIComponent(
                                    text
                                )}`}
                            >
                                Finalizar compra! ({cart.length} libros){' '}
                            </Button>
                        </Flex>
                    )}
                </AnimatePresence>
            </Stack>
            <AnimatePresence>
                {selectedImage && (
                    <Flex
                        key="backdrop"
                        alignItems="center"
                        as={motion.div}
                        backgroundColor="rgba(0,0,0,0.5)"
                        justifyContent="center"
                        layoutId={selectedImage}
                        position="fixed"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        onClick={() => setSelectedImage(null)}
                    >
                        <Image key="image" alt="image" src={selectedImage} />
                    </Flex>
                )}
            </AnimatePresence>
        </AnimateSharedLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const products = await api.list();
    return {
        props: {
            products,
        },
        revalidate: 10,
    };
};

export default IndexRoute;
 */
