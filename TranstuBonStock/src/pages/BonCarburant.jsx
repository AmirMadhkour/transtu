import React from 'react';
import { useContext } from 'react';
import BonCarburantContext from '../context/BonCarburantContext';
import NavbarHome from '../share/NavbarHome';
import DataTable from 'react-data-table-component';
import {
    Button, Modal, Select, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, Spacer, Input
} from '@chakra-ui/react';
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";

function BonCarburant() {
    const style = {
        backgroundColor: '#E9D280',
        minHeight: '100vh',
        padding: '20px',
      };

    const {
        numBon,
        _district,
        dateValable,
        carburant,
        quantity,
        isOpen,
        onOpen,
        onClose,
        selectedRow,
        filterText,
        handleRemove,
        handleEdit,
        handleAddNewRow,
        handleSaveChanges,
        handleFilter,
        clearForm,
        setDate,
        setQte,
        setNumBon,
        set_District,
        setCarburant,
        value,
        setValue,
        filteredRecords
    } = useContext(BonCarburantContext);

    console.log(value)
    const columns = [
        { name: 'Num Bon',
          selector: row => row.numBon,
          sortable: true 
        },
        { name: 'District',
          selector: row => row.district ? row.district.lib : '-',
          sortable: true 
        },
        { name: 'Date',
          selector: row => row.dateValable,
          sortable: true 
        },
        { name: 'Carburant',
          selector: row => row.carburantType ? row.carburantType.label : 'N/A',
          sortable: true 
        },
        { name: 'Quantity',
          selector: row => row.quantity,
          sortable: true 
        },
        { name: 'Valeur',
            selector: row => row.value,
            sortable: true 
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
            <NavbarHome />
            <div style={style}>
                <Button
                    mt={10}
                    onClick={() => { clearForm(); onOpen(); }}
                    colorScheme="blue"
                    mb={4}
                >
                    + Add Bon Carburant
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
                        <ModalHeader>{selectedRow ? 'Edit Bon Carburant' : 'Add Bon Carburant'}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <center>
                                <label>Num Bon Carburant</label>
                            </center>
                            <Spacer />
                            <Input
                                type="text"
                                value={numBon}
                                onChange={e => setNumBon(e.target.value)}
                                className="form-control"
                                borderColor="green"
                            />
                            <Spacer />
                            <center>
                                <label>Quantité</label>
                            </center>
                            <Spacer />
                            <Input
                                type="text"
                                value={quantity}
                                onChange={e => setQte(e.target.value)}
                                className="form-control"
                                borderColor="green"
                            />
                            <Spacer />
                            <center>
                                <label>District</label>
                            </center>
                            <Input
                                type="text"
                                value={_district}
                                onChange={e => set_District(e.target.value)}
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
              <Spacer />
                            <center>
                                <label>Date</label>
                            </center>
                          <Input
    value={dateValable}
    type="date"
    onChange={e => {
        const formattedDate = e.target.value;
        setDate(formattedDate);
    }}
    className="form-control"
    borderColor="green"
/>

          
                            <Spacer />
                            <center>
                                <label>Value</label>
                            </center>
                            <Input 
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                className="form-control"
                                borderColor="green"
                            />
                            <Spacer />
                        </ModalBody>
                        <ModalFooter>
                            {selectedRow ? (
                                <Button colorScheme="blue" onClick={handleSaveChanges}>Save Changes</Button>
                            ) : (
                                <Button colorScheme="blue" onClick={handleAddNewRow}>Add Bon Carburant</Button>
                            )}
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}

export default BonCarburant;
