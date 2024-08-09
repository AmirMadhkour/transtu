import React, { useContext } from 'react';
import Stat1Context from '../context/Stat1Context';
import {
    Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, 
    FormControl
} from '@chakra-ui/react';
import NavbarHome from '../share/NavbarHome';

function Stat1() {
    const style = {
        backgroundColor: '#E9D280',
        minHeight: '100vh',
        padding: '20px',
    };

    const { 
        date_debut,
        date_fin,
        DownloadPdfButton,
    } = useContext(Stat1Context);

    return (
        <>
        <NavbarHome />
            <div style={style}>
                <Card id="form-to-print">
                    <CardHeader>
                        <Heading size='md'>Etat des Bon Carburants </Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Date de Début
                                </Heading>
                                <FormControl>
                                    <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                                        {date_debut}
                                    </Box>
                                </FormControl>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Date de Fin
                                </Heading>
                                <FormControl>
                                    <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                                        {date_fin}
                                    </Box>
                                </FormControl>
                            </Box>
                            <DownloadPdfButton formId="form-to-print" />
                        </Stack>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default Stat1;
