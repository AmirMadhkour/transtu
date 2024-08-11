import React, { useContext } from 'react';
import NavbarHome from '../share/NavbarHome';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, Spacer, Input
} from '@chakra-ui/react';
import {
  Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, 
  FormControl,
} from '@chakra-ui/react';
import ReçuCarburantContext from '../context/ReçuCarburantContext';
import { BiSolidTrash } from "react-icons/bi";

function ReçuCarburant() {
    const style = {
        backgroundColor: '#E9D280',
        minHeight: '100vh',
        padding: '20px',
    };

    const { 
        isOpen,
        onOpen,
        onClose,
        date,
        matricule_vehicule,
        matricule_agent,      
        clearForm,
        setMatriculeVehicule,
        setMatriculeAgent,  
        setDate,
        handleAjout,
        receipts,    
        setNumBon,
        carburant,
        quantity,
        DownloadPdfButton,
        setQte,
        handleRemove,
        numBon,
        setCarburant
    } = useContext(ReçuCarburantContext);

    return (
        <>
            <NavbarHome />
            <div style={style}>
                <Button
                    mt={10}
                    onClick={() => { clearForm(); onOpen(); }}
                    colorScheme="blue"
                    mb={4}
                >
                    + Add Reçu Bon Carburant
                </Button>
                {receipts.map(receipt => (
                 <Card key={receipt.id} mt={4}>
                    <CardHeader>
                        <Heading size='md'>Reçu Bon Carburant</Heading>
                    </CardHeader>
                    
                    <CardBody>
                        
                        <div id={`form-to-print-${receipt.id}`}>
                        
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <DownloadPdfButton formId={`form-to-print-${receipt.id}`} />
            <Button colorScheme="red" onClick={() => handleRemove(receipt.id)} >
                <BiSolidTrash />
            </Button>
        </div>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Date
                                    </Heading>
                                    <FormControl>
                                        <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                                            {receipt.date}
                                        </Box>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Matricule Vehicule
                                    </Heading>
                                    <FormControl>
                                        <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                                            {receipt.moyendeTransport ? receipt.moyendeTransport.numeroDeSerie : 'N/A'}
                                        </Box>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Matricule Agent
                                    </Heading>
                                    <FormControl>
                                        <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                                            {receipt.moyendeTransport && receipt.moyendeTransport.owner ? receipt.moyendeTransport.owner.matricule : 'N/A'}
                                        </Box>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Numero Bon
                                    </Heading>
                                    <FormControl>
                                        <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                                            {receipt.bonCarburant ? receipt.bonCarburant.numBon : 'N/A'}
                                        </Box>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Quantite
                                    </Heading>
                                    <FormControl>
                                        <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                                            {receipt.bonCarburant ? receipt.bonCarburant.quantity : 'N/A'}
                                        </Box>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Carburant
                                    </Heading>
                                    <FormControl>
                                        <Box as='div' borderRadius='md' bg='#0B7B16' color='white' px={4} h={8} display='flex' alignItems='center'>
                                            {receipt.moyendeTransport && receipt.moyendeTransport.carburantType ? receipt.moyendeTransport.carburantType.label : 'N/A'}
                                        </Box>
                                    </FormControl>
                                </Box>
                            </Stack>
                        </div>                 
                    </CardBody>    
                </Card>
            ))}

                <Modal  isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Ajout Reçu Bon</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <center><label>Date</label></center>
                            <Spacer />
                            <Input
                                onChange={e => setDate(e.target.value)}
                                value={date}
                                borderColor="green"
                            />
                            <Spacer />
                            <center><label>Matricule Vehicule</label></center>
                            <Spacer />
                            <FormControl >
                                <Input
                                    type="text"
                                    value={matricule_vehicule}
                                    onChange={e => setMatriculeVehicule(e.target.value)}
                                    borderColor="green"
                                />
                            </FormControl>
                            <Spacer />
                            <center><label>Matricule Agent</label></center>
                            <Spacer />
                            <FormControl >
                                <Input
                                    type="text"
                                    value={matricule_agent}
                                    onChange={e => setMatriculeAgent(e.target.value)}
                                    borderColor="green"
                                />
                            </FormControl>
                            <Spacer />
                            <center><label>Numero Bon</label></center>
                            <Spacer />
                            <FormControl >
                                <Input
                                    type="text"
                                    value={numBon}
                                    onChange={e => setNumBon(e.target.value)}
                                    borderColor="green"
                                />
                            </FormControl>
                            <Spacer />
                            <center><label>Carburant</label></center>
                            <Spacer />
                            <FormControl >
                                <Input
                                    type="text"
                                    value={carburant}
                                    onChange={e => setCarburant(e.target.value)}
                                    borderColor="green"
                                />
                            </FormControl>
                            <Spacer />
                            <center><label>Quantité</label></center>
                            <Spacer />
                            <FormControl >
                                <Input
                                    type="text"
                                    value={quantity}
                                    onChange={e => setQte(e.target.value)}
                                    borderColor="green"
                                />
                            </FormControl>
                            <Spacer />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={handleAjout}>
                                Enregistrer
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}

export default ReçuCarburant;
