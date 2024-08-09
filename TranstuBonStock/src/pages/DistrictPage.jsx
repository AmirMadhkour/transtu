import React, { useContext , useEffect } from 'react';
import DistrictContext from '../context/DistrictContext';
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Spacer } from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import NavbarHome from '../share/NavbarHome'

function DistrictPage() {

  useEffect(() => {
    fetchDistrictsData();
  }, []);

  const {
    isOpen,
    onOpen,
    onClose,
    selectedRow,
    filterText,
    codeDistrict,
    libDistrict,
    filteredRecords,
    handleFilter,
    clearForm,
    handleAddNewRow,
    handleSaveChanges,
    handleEdit,
    handleRemove,
    setCodeDistrict,
    setLibDistrict,
    fetchDistrictsData
  } = useContext(DistrictContext);

  const columns = [
    {
      name: 'Code District',
      selector: row => row.code,
      sortable: true,
    },
    {
      name: 'Lib District',
      selector: row => row.lib,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <Button colorScheme="blue" onClick={() => handleEdit(row)} mr={2}> 
            <BiSolidEdit /> 
          </Button>
          <Button colorScheme="red" onClick={() => handleRemove(row)}> 
            <BiSolidTrash /> 
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
    <NavbarHome/>
    
    <div style={{ backgroundColor: '#E9D280', minHeight: '100vh', padding: '20px' }}>
      <Button mt={10} onClick={() => { clearForm(); onOpen(); }} colorScheme="blue" mb={4}>
        + Add District
      </Button>
      <Input
        onChange={handleFilter}
        value={filterText}
        type="text"
        placeholder="Search..."
        ml="auto"
        backgroundColor="#2653EC"
        color="white"
        borderColor="black"
        mb={4}
      />
      <DataTable
        columns={columns}
        data={filteredRecords}
        pagination
        paginationPerPage={10} 
        fixedHeader
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedRow ? 'Edit District' : 'Add District'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <center><label>Code District</label></center>
            <Spacer />
            <Input
              type="text"
              value={codeDistrict}
              onChange={e => setCodeDistrict(e.target.value)}
              className="form-control"
              borderColor="green"
            />
            <Spacer />
            <center><label>Lib District</label></center>
            <Spacer />
            <Input
              type="text"
              value={libDistrict}
              onChange={e => setLibDistrict(e.target.value)}
              className="form-control"
              borderColor="green"
            />
            <Spacer />
          </ModalBody>
          <ModalFooter>
            {selectedRow ? (
              <Button colorScheme="blue" onClick={handleSaveChanges}>Save Changes</Button>
            ) : (
              <Button colorScheme="blue" onClick={handleAddNewRow}>Add District</Button>
            )}
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
    </>
  );
}

export default DistrictPage;
