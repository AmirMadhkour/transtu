import { createContext, useState, useEffect } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { fetchBonCarburant, updateBonCarburant, getCarburantTypebyID, deleteBonCarburant, addBonCarburant } from '../api/BonCarburantAPI';
import { fetchDistricts } from '../api/DistrictAPI';

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
    const [value, setValue] = useState('');
    const [idCarburant, setIdCarburant] = useState('');
    const [idBon, setIdBon] = useState('');

    useEffect(() => {
        fetchBonCarburantDATA();
    }, []);

    useEffect(() => {
        if (quantity && carburant) {
            const newValue = calculateValue(quantity, carburant);
            setValue(newValue);
        }
    }, [quantity, carburant , value ]);

    const fetchBonCarburantDATA = async () => {
        try {
            const data = await fetchBonCarburant();
            setRecords(data);
        } catch (error) {
            console.error("Failed to fetch BonCarburant data", error);
        }
    };

    const handleRemove = async (row) => {

        if (confirm("Are you sure")) {
            await deleteBonCarburant(row.idBonCarburant);
            const updatedRecords = records.filter(record => record.idBonCarburant !== row.idBonCarburant);
            setRecords(updatedRecords);
        }
    };

    const calculateValue = (quantity, carburant) => {
        // Check the type and value of quantity and carburant
        console.log('calculateValue called with:', { quantity, carburant });
        const _idCa = parseInt(carburant);

        // Ensure quantity is a string before using replace
        const quantityStr = typeof quantity === 'string' ? quantity : quantity.toString();
        const quantityValue = parseFloat(quantityStr.replace('L', ''));
    console.log(quantityStr , quantityValue  )
        // Check if quantityValue is a number
        if (isNaN(quantityValue)) {
            console.error('Invalid quantity value:', quantityStr);
            return '0DT';
        }
    
        console.log('Parsed quantity value:', quantityValue);
    
        switch (_idCa) {
            case 3 :
                return (quantityValue * 1.860).toFixed(3) + 'DT';
            case 1 :
                return (quantityValue * 2.400).toFixed(3) + 'DT';
            case 2 :
                return (quantityValue * 1.500).toFixed(3) + 'DT';
            default:
                console.warn('Unexpected carburant type:', carburant);
                return '0DT';
        }
    };
    
    const handleEdit = (row) => {
        console.log('handleEdit called with:', row);
  
        setSelectedRow(row);
        setNumBon(row.numBon);
        setIdCarburant(row.carburantType ? row.carburantType.idCarburantType : '');
        setIdBon(row.idBonCarburant);
        setDate(row.dateValable);
        console.log(dateValable)
        setCarburant(row.carburantType ? row.carburantType.idCarburantType : 'N/A');
        set_District(row.district ? row.district.lib : '-');
        setQte(row.quantity.toString()); // Ensure quantity is a string
    
        // Calculate value and check the result
        const updatedValue = calculateValue(row.quantity, row.carburantType ? row.carburantType.idCarburantType : 'N/A');
         console.log('Calculated value:', updatedValue);
        setValue(updatedValue);
        console.log(row.value)
        onOpen();
    };
    
    const handleSaveChanges = async () => {
        const allDistrict = await fetchDistricts();
        let DistrictData = null;

        allDistrict.forEach((district) => {
            if (district.lib === _district) {
                DistrictData = district;
            }
        });
        if (DistrictData == null) return alert("District Not Found!");

        try {
            const carburantType1 = await getCarburantTypebyID(carburant);
            const updatedValue = calculateValue(quantity, carburant);
            const cnvrValue = updatedValue.toString(); // Ensure value is a string
            console.log(carburant , parseFloat(quantity))
            const updatedData = {
                numBon,
                district: DistrictData,
                dateValable,
                carburantType: {
                    idCarburantType: carburantType1.idCarburantType,
                    label: carburantType1.label,
                },
                quantity,
                value: cnvrValue,
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
        const allDistrict = await fetchDistricts();
        let DistrictData = null;

        allDistrict.forEach((district) => {
            if (district.lib === _district) {
                DistrictData = district;
            }
        });
        if (DistrictData == null) return alert("District Not Found!");

        try {
            const carburantType1 = await getCarburantTypebyID(carburant);
            const newValue = calculateValue(quantity, carburant);

            const newRow = {
                numBon,
                district: DistrictData,
                dateValable,
                carburantType: {
                    idCarburantType: carburantType1.idCarburantType,
                    label: carburantType1.label
                },
                quantity,
                value: newValue,
            };

            await addBonCarburant(newRow);
            setRecords([...records, newRow]);
            onClose();
            clearForm();
        } catch (error) {
            console.error("Error adding the record:", error);
        }

        window.location.reload();
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
