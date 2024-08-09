import { createContext, useState } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { fetchDistricts , updateDistricts , addDistricts , deleteDistricts } from '../api/DistrictAPI';


const DistrictContext = createContext();
export const DistrictProvider = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [codeDistrict, setCodeDistrict] = useState('');
    const [libDistrict, setLibDistrict] = useState('');
    const [records, setRecords] = useState([]);

    console.log(records)

    const fetchDistrictsData = async () => {
        try {
          const data = await fetchDistricts();
          setRecords(data);
        } catch (error) {
          console.error("Failed to fetch districts data", error);
        }
      };

    const handleRemove = async(row) => {
        if(confirm("Confirm")) {
            await deleteDistricts(row.id);
            const updatedRecords = records.filter(record => record.id !== row.id);
            setRecords(updatedRecords);
        }
        
    }

    const  handleEdit = async (row)  => {
        setSelectedRow(row);
        setCodeDistrict(row.code);
        setLibDistrict(row.lib);
        onOpen();
    }

    const handleSaveChanges= async () => {
    
        const  updatedData = {
            code : codeDistrict,
            lib : libDistrict,
        };

       
    try {
        await updateDistricts(selectedRow.id, updatedData);
        
        const updatedRecords = records.map(row =>
          row.id === selectedRow.id ? { ...row, ...updatedData } : row
        );
        setRecords(updatedRecords);
        onClose();
        setSelectedRow(null);
      } catch (error) {
        console.error("Error updating the record:", error);
      }
    }

    const  handleAddNewRow = async() => {

        const newRow = {
            
            code : codeDistrict,
            lib : libDistrict,
        };

        try {
            await addDistricts(newRow);
            setRecords([...records , newRow]);
            onClose();
            clearForm();
          } catch (error) {
            console.error("Error adding the district:", error);
          }
       
    }

    function clearForm() {
        setCodeDistrict('');
        setLibDistrict('');
        setSelectedRow(null);
    }

    function handleFilter(e) {
        setFilterText(e.target.value);
    }

    const filteredRecords = records.filter(row =>
        (row.code && row.code.toString().toLowerCase().includes(filterText.toLowerCase())) ||
        (row.lib && row.lib.toString().toLowerCase().includes(filterText.toLowerCase()))
      );
      

    return (
        <DistrictContext.Provider value={{
            records,
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
        }}>
            {children}
        </DistrictContext.Provider>
    );
};

export default DistrictContext;
