import React, { useState, useEffect , useContext  } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Select,
  Spacer
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import FinalLogo from '../Images/Transtu.webp';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { CiLogout } from 'react-icons/ci';
import { FaBus, FaTrain, FaCog, FaUser, FaGasPump, FaPlane } from 'react-icons/fa';
import { GrBus } from 'react-icons/gr';
import { IoExtensionPuzzle } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { ImStatsDots } from "react-icons/im";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import LoginContext from '../context/LoginContext';

let NAV_ITEMS = [
  {
    label: 'Home',
    href:'/Home',
    icon: FaBus,
  },
  {
    label: 'Menu',
    icon: FaCog,
    children: [
      {
        label: 'Vehicules',
        href: '/vehicules',
        icon: GrBus,
      },
      {
        label: 'Districts ',
        href: '/districts',
        icon: IoExtensionPuzzle,
      },
      {
        label: 'Dashboard ',
        href: '/dashboard',
        icon: LuLayoutDashboard,
      },
      {
        label: 'Bon Carburant ',
        href: '/bon_carburant',
        icon: FaGasPump,
      },
    ],
  },
  {
    label: 'Mouvements',
    icon: FaPlane,
    children: [
      {
        label: 'Voyage Tombe',
        href: '/voyage_tombe',
        icon: FaPlane,
      },
      {
        label: 'Reçus Carburant',
        href: '/reçu_carburant',
        icon: FaGasPump,
      },
    ],
  },
  {
    label: 'Statistique',
    icon: ImStatsDots,
    children: [
      {
        label: 'Stat 1',
        href: '/stat1',
        icon: FaCog,
      },
    ],
  },
  {
    label: 'Users',
    href: '/userpage',
    icon: FaUsersCog,
  },
  {
    label: 'Compte User',
    href: '/compte_userpage',
    icon: RiAccountCircleFill,
  },

];

export default function WithSubnavigation() {
  const {username , setUsername , userData }=useContext(LoginContext)
  const { isOpen, onToggle } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  console.log(userData)
  console.log(username)

  let userRole = null ;

  userData.forEach( (c) => {
       if (c.fullName === username) {
        userRole = c.role ; 
       } 
  });

  switch (userRole) {
    case 'chef Service': 
      NAV_ITEMS = [
        {
          label: 'Home',
          href: '/Home',
          icon: FaBus,
        },
        {
          label: 'Menu',
          icon: FaCog,
          children: [
            {
              label: 'Vehicules',
              href: '/vehicules',
              icon: GrBus,
            },
            {
              label: 'Districts',
              href: '/districts',
              icon: IoExtensionPuzzle,
            },
            {
              label: 'Dashboard',
              href: '/dashboard',
              icon: LuLayoutDashboard,
            },
            {
              label: 'Bon Carburant',
              href: '/bon_carburant',
              icon: FaGasPump,
            },
          ],
        },
        {
          label: 'Mouvements',
          icon: FaPlane,
          children: [
            {
              label: 'Voyage Tombe',
              href: '/voyage_tombe',
              icon: FaPlane,
            },
            {
              label: 'Reçus Carburant',
              href: '/reçu_carburant',
              icon: FaGasPump,
            },
          ],
        },
        {
          label: 'Statistique',
          icon: ImStatsDots,
          children: [
            {
              label: 'Stat 1',
              href: '/stat1',
              icon: FaCog,
            },
          ],
        },
        {
          label: 'Compte User',
          href: '/compte_userpage',
          icon: RiAccountCircleFill,
        },
      ];
      break;
  
    case 'Administrateur': 
      NAV_ITEMS = [
        {
          label: 'Home',
          href: '/Home',
          icon: FaBus,
        },
        {
          label: 'Users',
          href: '/userpage',
          icon: FaUsersCog,
        },
        {
          label: 'Compte User',
          href: '/compte_userpage',
          icon: RiAccountCircleFill,
        },
      ];
      break;
  
    case 'Agent de Saisie': 
      NAV_ITEMS = [
        {
          label: 'Home',
          href: '/Home',
          icon: FaBus,
        },
        {
          label: 'Menu',
          icon: FaCog,
          children: [
            {
              label: 'Vehicules',
              href: '/vehicules',
              icon: GrBus,
            },
            {
              label: 'Districts',
              href: '/districts',
              icon: IoExtensionPuzzle,
            },
            {
              label: 'Dashboard',
              href: '/dashboard',
              icon: LuLayoutDashboard,
            },
            {
              label: 'Bon Carburant',
              href: '/bon_carburant',
              icon: FaGasPump,
            },
          ],
        },
        {
          label: 'Mouvements',
          icon: FaPlane,
          children: [
            {
              label: 'Reçus Carburant',
              href: '/reçu_carburant',
              icon: FaGasPump,
            },
          ],
        },
        {
          label: 'Compte User',
          href: '/compte_userpage',
          icon: RiAccountCircleFill,
        },
      ];
      break;
  
    default:
      NAV_ITEMS = [ {
        label: 'Home',
        href:'/Home',
        icon: FaBus,
      },
      
      {
        label: 'Compte User',
        href: '/compte_userpage',
        icon: RiAccountCircleFill,
      },];
      break;
  }
  
  


console.log(userRole)
  const GoHome = () => {
    navigate('/');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const Logout = () => {
    localStorage.removeItem("username");
    closeModal();
    navigate('/Login');
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Submitted');
  };
  
  return (
    <Box>
      <Flex
        bg="#4758F2"
        color="white"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
        justify="space-between"
      >

        
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems="center">
          <Box w="200px" mr={4} h="100px" display="flex" alignItems="center" justifyContent="flex-start" cursor="pointer" ml={-3}>
            <Image
              ml={-3}
              src={FinalLogo}
              onClick={GoHome}
              alt="LOGO"
              width="190px"
              height="118px"
              cursor="pointer"
            />
          </Box>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>  
      {/* 
      <Flex align="center" mr={4}>
        <Select
            size="sm" // Make the select box smaller
            placeholder='Choisir District'
            bg="#E9D280" // Background color of the options
            color="black" // Text color of the options
          >
            <option  value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
          <Spacer/>
        </Flex>
      */}
        
        <Spacer/>
       
        <Flex align="center" mr={4}>
          <Button
            ml={4}
            size="sm"
            leftIcon={<CiLogout color='black' />}
            onClick={openModal}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="#0B7B16"
            _hover={{
              bg: 'pink.500',
            }}
          >
            LogOut
          </Button>
          
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <Modal size="sm" isOpen={isModalOpen} onClose={closeModal} isCentered>
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
                Are you sure?
              </Button>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color='#E9D280' />
        </ModalContent>
      </Modal>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('white', 'black');
  const linkHoverColor = useColorModeValue('#F5D564', 'gray.200');
  const popoverContentBgColor = useColorModeValue('#F5D564', 'gray.800');
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                onClick={() => navigate(navItem.href ?? '#')}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                <Flex align="center">
                  <Icon as={navItem.icon} mr={2} />
                  {navItem.label}
                </Flex>
              </Box>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0}
                color="black"
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
}

const DesktopSubNav = ({ label, href, subLabel, children, icon }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        as="a"
        onClick={() => navigate(href ?? '#')}
        role="group"
        display="block"
        p={2}
        rounded="md"
        _hover={{ bg: useColorModeValue('#E9D280', 'green') }}
      >
        <Stack direction="row" align="center">
          <Icon as={icon} mr={2} />
          <Box>
            <Text
              transition="all .3s ease"
              _groupHover={{ color: 'green' }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize="sm">{subLabel}</Text>
          </Box>
          <Flex
            transition="all .3s ease"
            transform="translateX(-10px)"
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify="flex-end"
            align="center"
            flex={1}
          >
            <Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
      {children && (
        <Stack pl={4}>
          {children.map((child) => (
            <DesktopSubNav key={child.label} {...child} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'black')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, icon }) => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        onClick={() => navigate(href ?? '#')}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Flex align="center">
          <Icon as={icon} mr={2} />
          <Text fontWeight={600} color={useColorModeValue('green', 'green')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition="all .25s ease-in-out"
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </Box>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('#4758F2', 'gray.700')}
          align="start"
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} color="#E9D280" py={2} onClick={() => navigate(child.href ?? '#')}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};


 


