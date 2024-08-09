import { createContext, useEffect, useState } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { fetchDistribution, addRecu } from '../api/DistributionAPI';
import {fetchVehicule , getAllOwners} from '../api/VehiculeAPI';
import {fetchBonCarburant  } from '../api/BonCarburantAPI';



const ReçuCarburantContext = createContext();

export const ReçuCarburantProvider = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [date, setDate] = useState('');
    const [matricule_vehicule, setMatriculeVehicule] = useState('');
    const [matricule_agent, setMatriculeAgent] = useState('');
    const [numBon, setNumBon] = useState('');
    const [carburant, setCarburant] = useState('');
    const [quantity, setQte] = useState('');
    const [receipts, setReceipts] = useState([]);
    
    console.log(numBon)
    console.log(receipts)
    useEffect(() => {
        fetchRecuDATA();
    }, []);
  
    const fetchRecuDATA = async () => {
        try {
            const data = await fetchDistribution();
            setReceipts(data);
        } catch (error) {
            console.error("Failed to fetch recu data", error);
        }
    };

    function clearForm() {
        setNumBon('');
        setDate('');
        setCarburant('');
        setQte('');
        setMatriculeAgent('');
        setMatriculeVehicule('');
    }
    
    const handleAjout = async () => {

        // Fetch vehicule IDs
        const allVehicule = await fetchVehicule();
        let idvehicule = null;
        allVehicule.forEach((moyendeTransport) => {
          if (moyendeTransport.numeroDeSerie === matricule_vehicule) {
            idvehicule = moyendeTransport.id;
            console.log(idvehicule)
          }
        });
        if (idvehicule == null) return alert("Vehicule ID not found!");
      
       
        const allBon = await fetchBonCarburant();
        console.log(allBon);
        
        const bonCarburant = allBon.find(c => c.numBon === Number(numBon) );
        console.log(bonCarburant);
        let idBon = 0 ; 
        if (bonCarburant) {
             idBon = bonCarburant.idBonCarburant;
           
            console.log("Found BonCarburant ID:", idBon);
            // Now you can use `idBon` for further processing
        } else {
            alert("Bon not found!");
        }

        const allOwners = await getAllOwners();
    
        let ownerDetails = null;
        allOwners.forEach(
          (owner)=>{
          if (owner.matricule === matricule_agent){
            ownerDetails = owner
          }
        })
        if (ownerDetails == null) return alert("Owner not found!")
     
        
    
      
   

        const newRecu = {

          date: date,
          agent : ownerDetails.fullName ,
          moyendeTransport: {
            id: idvehicule,
            numeroDeSerie: matricule_vehicule,
            carburantType: {
              label: carburant,
            },
            owner: ownerDetails,
          },
          bonCarburant: {
            idBonCarburant: idBon ,
            numBon: numBon,
            quantity: quantity,
          },
        };
      console.log(newRecu)
        try {
          await addRecu(newRecu);
          setReceipts([...receipts, newRecu]);
          onClose();
        } catch (error) {
          console.error("Failed to add recu", error);
        }
        onClose();
        clearForm();
        
      };
      
    return (
        <ReçuCarburantContext.Provider value={{
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
            setNumBon, // Verify this is correctly included here
            carburant,
            quantity,
            setQte,
            numBon,
            setCarburant // Verify this is correctly included here
        }}>
            {children}
        </ReçuCarburantContext.Provider>
    );
};

export default ReçuCarburantContext;
