import { createContext, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Stat1Context = createContext();

export const Stat1Provider = ({ children }) => {
    const [date_debut, setDateDebut] = useState('');
    const [date_fin, setDateFin] = useState('');

    const DownloadPdfButton = ({ formId }) => {
        const handleDownload = () => {
            const input = document.getElementById(formId);

            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();

                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position -= pageHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('form.pdf');
            });
        };

        return <button onClick={handleDownload}>Download PDF</button>;
    };

    return (
        <Stat1Context.Provider value={{
            date_debut,
            date_fin,
            setDateDebut,
            setDateFin,
            DownloadPdfButton,
        }}>
            {children}
        </Stat1Context.Provider>
    );
};

export default Stat1Context;
