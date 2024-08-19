import React, { useContext } from 'react';
import NavbarHome from '../share/NavbarHome';
import DataTable from 'react-data-table-component';
import {
  Button, Modal, Select, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, Spacer, Input
} from '@chakra-ui/react';
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import VehiculeContext from '../context/VehiculeContext';


function VehiclePage() {

 
  
  const style = {
    backgroundColor: '#E9D280',
    minHeight: '90vh',
    padding: '20px',
};

  const {        
    records,
    onClose,
    onOpen,    
    setRecords,
    selectedRow,
    setSelectedRow,
    handleRemove,
    handleEdit,
    handleFilter,
    handleSaveChanges,
    filteredRecords,
    handleAddNewRow,
    isOpen,
    filterText,
    setFilterText,
    numeroDeSerie,
    setNumeroDeSerie,
    libVehicule,
    setLibVehicule,
    _district,
    set_District,
    marque,
    setMarque,
    carburant,
    clearForm,
    setCarburant
  } = useContext(VehiculeContext);



  const columns = [
    {
      name: 'Numero de Serie',
      selector: row => row.numeroDeSerie,
      sortable: true,
    },
    {
      name: 'Lib Vehicule',
      selector: row => row.owner ? row.owner.fullName : '',
      sortable: true,
    },
    {
      name: 'District',
      selector: row => row.district ? row.district.lib : '',
      sortable: true,
    },
    {
      name: 'Marque',
      selector: row => row.marque,
      sortable: true,
    },
    {
      name: 'Carburant',
      selector: row => row.carburantType ? row.carburantType.label : 'N/A',
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <Button colorScheme="blue" onClick={() => handleEdit(row)} mr={2}>
            <BiSolidEdit />
          </Button>
          <Button colorScheme="red" onClick={() => handleRemove(row)} >
            <BiSolidTrash />
          </Button>
        </>
      ),
    },
  ];
  
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
          + Add Vehicle
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
            <ModalHeader>{selectedRow ? 'Edit Vehicle' : 'Add Vehicle'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <center><label>Numero de Serie</label></center>
              <Spacer />
              <Input
                type="text"
                value={numeroDeSerie}
                onChange={e => setNumeroDeSerie(e.target.value)}
                className="form-control"
                borderColor="green"
              />
              <Spacer />
              <center><label>Lib Vehicule</label></center>
              <Spacer />
              <Input
                type="text"
                value={libVehicule}
                onChange={e => setLibVehicule(e.target.value)}
                className="form-control"
                borderColor="green"
              />
              <Spacer />
              <center><label>District</label></center>
              <Input
                type="text"
                value={_district}
                onChange={e => set_District(e.target.value)}
                className="form-control"
                borderColor="green"
              />
              
              <Spacer />
              <center><label>Marque</label></center>
              <Input
                type="text"
                value={marque}
                onChange={e => setMarque(e.target.value)}
                className="form-control"
                borderColor="green"
              />
              
              <Spacer />
              <center><label>Carburant</label></center>
              <Select
                value={carburant}
                borderColor="green"
                onChange={e => setCarburant(e.target.value)}
                size="sm"
                placeholder='Choose Carburant'
                bg="White"
                color="black"
              >
                <option value='1'>Essance</option>
                <option value='2'>gaz</option>
                <option value='3'>Mazout</option>
              </Select>
              <Spacer />
            </ModalBody>
            <ModalFooter>
              {selectedRow ? (
                <Button colorScheme="blue" onClick={handleSaveChanges}>Save Changes</Button>
              ) : (
                <Button colorScheme="blue" onClick={handleAddNewRow}>Add Vehicle</Button>
              )}
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default VehiclePage;
