import React, { useState } from 'react';
import { Flex, Spacer, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Button, Image, Select } from '@chakra-ui/react';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import FinalLogo from '../Images/Transtu.webp';

function NavbartypeBon() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState({});
    const [selectedOption, setSelectedOption] = useState("");

    const openModal = (modalName) => setIsModalOpen({ ...isModalOpen, [modalName]: true });
    const closeModal = (modalName) => setIsModalOpen({ ...isModalOpen, [modalName]: false });

    const Logout = () => {
        navigate(`/Login`);
    };

    const GoHome = () => {
        navigate(`/`);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box bg='#3440C6' p={2}>
            <Flex alignItems='center'>
                <Box w='200px' h='100px' display='flex' alignItems='center' justifyContent='flex-start' cursor='pointer' color='white' ml={-3}>
                    <Image
                        src={FinalLogo}
                        onClick={GoHome}
                        alt="LOGO"
                        width="190px"
                        height="118px"
                        cursor='pointer'
                    />
                </Box>
                <Spacer />
                <Button
                    variant='solid'
                    bg='white'
                    color='black'
                    onClick={() => openModal('button1')}
                    style={{ margin: '0 5px', width: '120px', height: '40px' }}
                >
                    Button 1
                </Button>
                <Modal size="sm" isOpen={isModalOpen.button1} onClose={() => closeModal('button1')} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#3440C6" borderRadius="md" p={4}>
                        <ModalHeader>Button 1 Options</ModalHeader>
                        <Select placeholder="Select option" onChange={handleSelectChange} value={selectedOption} mb={4}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                        <ModalCloseButton color='white' />
                    </ModalContent>
                </Modal>
                <Spacer />
                <Button
                    variant='solid'
                    bg='white'
                    color='black'
                    onClick={() => openModal('button2')}
                    style={{ margin: '0 5px', width: '120px', height: '40px' }}
                >
                    Button 2
                </Button>
                <Modal size="sm" isOpen={isModalOpen.button2} onClose={() => closeModal('button2')} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#3440C6" borderRadius="md" p={4}>
                        <ModalHeader>Button 2 Action</ModalHeader>
                        <ModalCloseButton color='white' />
                    </ModalContent>
                </Modal>
                <Spacer />
                <Button
                    variant='solid'
                    bg='white'
                    color='black'
                    onClick={() => openModal('button3')}
                    style={{ margin: '0 5px', width: '120px', height: '40px' }}
                >
                    Button 3
                </Button>
                <Modal size="sm" isOpen={isModalOpen.button3} onClose={() => closeModal('button3')} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#3440C6" borderRadius="md" p={4}>
                        <ModalHeader>Button 3 Action</ModalHeader>
                        <ModalCloseButton color='white' />
                    </ModalContent>
                </Modal>
                <Spacer />
                <Button
                    variant='solid'
                    bg='white'
                    color='black'
                    onClick={() => openModal('button4')}
                    style={{ margin: '0 5px', width: '120px', height: '40px' }}
                >
                    Button 4
                </Button>
                <Modal size="sm" isOpen={isModalOpen.button4} onClose={() => closeModal('button4')} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#3440C6" borderRadius="md" p={4}>
                        <ModalHeader>Button 4 Action</ModalHeader>
                        <ModalCloseButton color='white' />
                    </ModalContent>
                </Modal>
                <Spacer />
                <Button
                    variant='solid'
                    bg='white'
                    color='black'
                    onClick={() => openModal('button5')}
                    style={{ margin: '0 5px', width: '120px', height: '40px' }}
                >
                    Button 5
                </Button>
                <Modal size="sm" isOpen={isModalOpen.button5} onClose={() => closeModal('button5')} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#3440C6" borderRadius="md" p={4}>
                        <ModalHeader>Button 5 Action</ModalHeader>
                        <ModalCloseButton color='white' />
                    </ModalContent>
                </Modal>
                <Spacer />
                <Button
                    variant='solid'
                    bg='white'
                    color='black'
                    onClick={() => openModal('button6')}
                    style={{ margin: '0 5px', width: '120px', height: '40px' }}
                >
                    Button 6
                </Button>
                <Modal size="sm" isOpen={isModalOpen.button6} onClose={() => closeModal('button6')} isCentered>
                    <ModalOverlay />
                    <ModalContent bg="#3440C6" borderRadius="md" p={4}>
                        <ModalHeader>Button 6 Action</ModalHeader>
                        <ModalCloseButton color='white' />
                    </ModalContent>
                </Modal>
                <Spacer />
                <Button
                    leftIcon={<CiLogout color='black' />}
                    variant='solid'
                    bg='white'
                    color='black'
                    onClick={() => openModal('logout')}
                    style={{ width: '120px', height: '40px' }}
                >
                    Log Out
                </Button>
                <Modal size="sm" isOpen={isModalOpen.logout} onClose={() => closeModal('logout')} isCentered>
          <ModalOverlay />
          <ModalContent bg="#3440C6" borderRadius="md" p={4}>
            <ModalHeader>
              <Flex direction="column" align="center">
                <Button
                  leftIcon={<CiLogout color='black' />}
                  variant='solid'
                  bg='#0B7B16'
                  color='#E9D280'
                  onClick={Logout}
                  style={{ width: '180px', height: '40px' }}
                >
                  Are you sure ?
                </Button>
              </Flex>
            </ModalHeader>
            <ModalCloseButton color='#E9D280' />
                    </ModalContent>
                </Modal>
            </Flex>
        </Box>
    );
}

export default NavbartypeBon;
