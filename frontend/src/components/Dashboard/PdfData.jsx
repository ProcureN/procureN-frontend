import React from 'react';
import { BsFiletypePdf } from 'react-icons/bs';
// import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfData = ({ fileName, bdy, wid }) => {
  const handleDownload = async () => {
    const date = new Date();

    try {
      // const response = await axios.get('/api/data'); // replace with your MongoDB API endpoint
      // const data = response.data;

      // create PDF document definition
      const docDefinition = {
        content: [
          { text: `${fileName}`, style: 'header' },
          { text: `${date})` },
          { text: '\n' },
          {
            table: {
              headerRows: 1,
              widths: wid,
              body: bdy,
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            // background: 'red', // add background color
            // color: '#fff', // add text color
            margin: [0, 0, 0, 10], // add margin to separate from table
          },
          body: {
            fontSize: 18,
            bold: true,
            // background: 'red', // add background color
            // color: '#fff', // add text color
            // margin: [0, 0, 0, 10], // add margin to separate from table
          },
        },
      };

      pdfMake.createPdf(docDefinition).download(`${fileName}~${date}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className='text-2xl text-red-700 lg:text-3xl'
    >
      <BsFiletypePdf />
    </button>
  );
};

export default PdfData;
