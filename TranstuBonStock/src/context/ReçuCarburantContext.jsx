import { createContext, useEffect, useState } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { fetchDistribution, addRecu , removeRecu } from '../api/DistributionAPI';
import {fetchVehicule , getAllOwners} from '../api/VehiculeAPI';
import {fetchBonCarburant  } from '../api/BonCarburantAPI';
import { IoMdDownload } from "react-icons/io";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { BiArrowToBottom } from "react-icons/bi";
import { Button } from '@chakra-ui/react';

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

    const handleRemove = async (id) => {
      if (confirm("Are you sure?")) {
          try {
              await removeRecu(id);
              const updatedRecords = receipts.filter(receipt => receipt.id !== id);
              setReceipts(updatedRecords);
          } catch (error) {
              console.error("Failed to remove recu", error);
          }
      }
  };
    
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

        //get the owner by matricule 
        const allOwners = await getAllOwners();
        let ownerDetails = null;
        allOwners.forEach(
          (owner)=>{
          if (owner.matricule === matricule_agent){
            ownerDetails = owner
          }
        })
        if (ownerDetails == null) return alert("Owner not found!")
     
        
          const agentReceiptsCount = receipts.filter(
            (receipt) => receipt.moyendeTransport.owner.matricule === matricule_agent
        ).length;
    
        if (agentReceiptsCount >= 5) {
            alert("L'agent a atteint le nombre maximal de reçus autorisés (5).");
            return;
        } else {

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

        }
       

        
      };


      const DownloadPdfButton = ({ formId }) => {
        const handleDownload = () => {
          const input = document.getElementById(formId);
      
          if (!input) {
              console.error(`Element with id ${formId} not found!`);
              return;
          }
      
          html2canvas(input).then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
      
              // Get card dimensions (width and height) in pixels
              const cardWidth = canvas.width;
              const cardHeight = canvas.height;
      
              // Convert dimensions to mm for jsPDF
              const pdfWidth = cardWidth * 0.264583; // 1px = 0.264583mm
              const pdfHeight = cardHeight * 0.264583;
      
              // Create a new jsPDF instance with the card size
              const pdf = new jsPDF({
                  orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
                  unit: 'mm',
                  format: [pdfWidth, pdfHeight],
              });
      
              // Add image to the PDF at the top-left corner
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
              // Save the generated PDF
              pdf.save('card.pdf');
          });
      };
      
    
        return (
            <Button onClick={handleDownload} colorScheme="blue" leftIcon={<BiArrowToBottom />}>
                Download PDF
            </Button>
        );
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
            handleRemove,
            DownloadPdfButton,
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
