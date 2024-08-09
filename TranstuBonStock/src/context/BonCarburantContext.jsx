import { createContext, useState, useEffect } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';
import { fetchBonCarburant, updateBonCarburant, getCarburantTypebyID , deleteBonCarburant , addBonCarburant } from '../api/BonCarburantAPI';
import { fetchDistricts} from '../api/DistrictAPI';


const BonCarburantContext = createContext();

export const BonCarburantProvider = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [numBon, setNumBon] = useState('');
    const [_district, set_District] = useState('');
    const [dateValable, setDate] = useState('');
    const [carburant, setCarburant] = useState('');
    const [quantity, setQte] = useState('');
    const [records, setRecords] = useState([]);
    const [value, setValue] = useState([]);
    const [idCarburant, setIdCarburant] = useState('');
    const [idBon, setIdBon] = useState('');


     useEffect(() => {
        fetchBonCarburantDATA();
     }, []);

    const fetchBonCarburantDATA = async () => {
        try {
            const data = await fetchBonCarburant();
            setRecords(data);
        } catch (error) {
            console.error("Failed to fetch BonCarburant data", error);
        }
    };

    const handleRemove = async (row) => { 
        if ( confirm("Are you sure") ) {
            await deleteBonCarburant(row.idBonCarburant)
            const updatedRecords = records.filter(record => record.idBonCarburant !== row.idBonCarburant);
        setRecords(updatedRecords);
        }
        
    };

    const handleEdit = (row) => {
        setSelectedRow(row);
        setNumBon(row.numBon);
        setIdCarburant(row.carburantType ? row.carburantType.idCarburantType : '');
        setIdBon(row.idBonCarburant);
        setDate(row.dateValable);       
        setCarburant(row.carburantType ? row.carburantType.label : 'N/A');
        set_District(row.district ? row.district.lib : '-');
        setQte(row.quantity);
        setValue(row.value);
        onOpen();
    };

    const handleSaveChanges = async () => {

        //district detail
    const allDistrict = await fetchDistricts();
    let DistrictData = null ;

    allDistrict.forEach(
      (district)=> {
        if(district.lib === _district){
          DistrictData = district
        }
      }
    ) 
    if (DistrictData == null ) return alert("District Not Found!")

        try {
            const carburantType1 = await getCarburantTypebyID(carburant);

            const updatedData = {
                numBon,
                district : DistrictData,
                dateValable,
                carburantType: {
                    idCarburantType: carburantType1.idCarburantType,
                    label: carburantType1.label,
                },
                quantity,
                value,
            };

            await updateBonCarburant(idBon, updatedData);

            const updatedRecords = records.map(row =>
                row.idBonCarburant === selectedRow.idBonCarburant ? { ...row, ...updatedData } : row
            );
            setRecords(updatedRecords);
            onClose();
            setSelectedRow(null);
        } catch (error) {
            console.error("Error updating the record:", error);
        }
    };

    const handleAddNewRow = async () => {

        //district detail
    const allDistrict = await fetchDistricts();
    let DistrictData = null ;

    allDistrict.forEach(
      (district)=> {
        if(district.lib === _district){
          DistrictData = district
        }
      }
    ) 
    if (DistrictData == null ) return alert("District Not Found!")


        const carburantType1 = await getCarburantTypebyID(carburant);
        const newRow = {
            
            numBon,
            district: DistrictData,
            dateValable,
            carburantType:
            {
                idCarburantType : carburantType1.idCarburantType,
                label: carburantType1.label
            } ,
            quantity,
            value,
        };
        try {
            await addBonCarburant(newRow);

            setRecords([...records, newRow]);
            onClose();
            clearForm();
        } catch (error) {
            console.error("Error updating the record:", error);
        }
        
    };

    const clearForm = () => {
        setNumBon('');
        set_District('');
        setDate('');
        setCarburant('');
        setQte('');
        setValue('');
        setSelectedRow(null);
    };

    const handleFilter = (e) => {
        setFilterText(e.target.value);
    };

    const filteredRecords = records.filter(row =>
        (row.numBon ? row.numBon.toString().toLowerCase() : '').includes(filterText.toLowerCase()) ||
        (row.district.lib || '').toLowerCase().includes(filterText.toLowerCase()) ||
        (row.dateValable || '').toLowerCase().includes(filterText.toLowerCase()) ||
        (row.carburantType.label || '').toLowerCase().includes(filterText.toLowerCase()) ||
        (row.quantity || '').toLowerCase().includes(filterText.toLowerCase()) ||
        (row.value || '').toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <BonCarburantContext.Provider value={{
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
            value,
            setValue,
            setCarburant,
            filteredRecords
        }}>
            {children}
        </BonCarburantContext.Provider>
    );
};

export default BonCarburantContext;
