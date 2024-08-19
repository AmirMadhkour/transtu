import { createContext, useState, useEffect } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { fetchVehicule, updateMoyendeTransport  , getAllOwners , getCarburantTypebyID , deleteMoyenDeTransport , addMoyendeTransport} from "../api/VehiculeAPI"; 
import { fetchDistricts} from '../api/DistrictAPI';

const VehiculeContext = createContext();

export const VehiculeProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [numeroDeSerie, setNumeroDeSerie] = useState('');
  const [libVehicule, setLibVehicule] = useState('');
  const [_district, set_District] = useState('');
  const [marque, setMarque] = useState('');
  const [carburant, setCarburant] = useState('');
  const [idDistrict , setIdDistrict] = useState('');
  const [idOwner , setIDowner] = useState ('');

  
  console.log(records)
  
  useEffect(() => {
    fetchVehiculeData();
  }, []);

  const fetchVehiculeData = async () => {
    try {
      const data = await fetchVehicule();
      setRecords(data);
    } catch (error) {
      console.error("Failed to fetch vehicule data", error);
    }
  };

  const handleRemove = async (row) => {
    
   if ( confirm("Are you sure") ) {
    await deleteMoyenDeTransport (row.id);
    const updatedRecords = records.filter(record => record.id !== row.id);
    setRecords(updatedRecords);
   }
   
  };
  

  const handleEdit = (row) => {
    setSelectedRow(row);
    setNumeroDeSerie(row.numeroDeSerie);
    setLibVehicule(row.owner ? row.owner.fullName : '');
    setIDowner(row.owner ? row.owner.id : '')
    setMarque(row.marque);
    set_District(row.district ? row.district.lib : '-');
    setCarburant(row.carburantType ? row.carburantType.idCarburantType : 'N/A');
    onOpen();
    
    //console.log(row.carburant)
  };

  //console.log(libVehicule)
  //console.log(idOwner)
  
 
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

    //owneer detail
    const allOwners = await getAllOwners();
    
    let ownerDetails = null;
    allOwners.forEach(
      (owner)=>{
      if (owner.fullName === libVehicule){
        ownerDetails = owner
      }
    })
    if (ownerDetails == null) return alert("Owner not found!")
 
  
  const carburantType1 = await getCarburantTypebyID(carburant);


    const updatedData = {

      numeroDeSerie,
      owner: ownerDetails ,
      district : DistrictData,
      marque,
      carburantType:
      {
        idCarburantType : carburantType1.idCarburantType,
        label: carburantType1.label
    } ,
    };



    try {
      await updateMoyendeTransport(selectedRow.id, updatedData);
      
      const updatedRecords = records.map(row =>
        row.id === selectedRow.id ? { ...row, ...updatedData } : row
      );
      setRecords(updatedRecords);
      onClose();
      setSelectedRow(null);
    } catch (error) {
      console.error("Error updating the record:", error);
    }
  };

  const handleAddNewRow = async() => {

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
    const allOwners = await getAllOwners();
    
    let ownerDetails = null;
    allOwners.forEach(
      (owner)=>{
      if (owner.fullName === libVehicule){
        ownerDetails = owner
      }
    })
    if (ownerDetails == null) return alert("Owner not found!")

    const carburantType1 = await getCarburantTypebyID(carburant);
    const newRow = {
      
      numeroDeSerie,
      owner: ownerDetails,
      district: DistrictData,
      marque,
      carburantType:
      {
        idCarburantType : carburantType1.idCarburantType,
        label: carburantType1.label
    } ,
    };

    try {
      await addMoyendeTransport(newRow);
    
      setRecords([...records, newRow]);
      onClose();
      setSelectedRow(null);
    } catch (error) {
      console.error("Error updating the record:", error);
    }
   
    onClose();
    clearForm();
  };

  const clearForm = () => {
    setNumeroDeSerie('');
    setLibVehicule('');
    set_District('');
    setMarque('');
    setCarburant('');
    setSelectedRow(null);
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const filteredRecords = records.filter(row =>
    (row.numeroDeSerie || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (row.owner.fullName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (row.district.lib || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (row.marque || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (row.carburantType.label || '').toLowerCase().includes(filterText.toLowerCase())
    
  );

  return (
    <VehiculeContext.Provider value={{
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
    }}>
      {children}
    </VehiculeContext.Provider>
  );
};

export default VehiculeContext;
