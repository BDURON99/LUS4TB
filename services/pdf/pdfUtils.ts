import { Examination } from '@/models/Examination';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

/**
 * This function creates and share the PDF report.
 * It uses the provided examination data to fill in the report.
 * @param html The HTML content to convert to a PDF
 * @param updateExamination A function to update the examination data
 * @returns 
 */
export const createAndSharePdf = async (
  html: string,
  updateExamination: (updates: Partial<Examination>) => void
): Promise<void> => {
  
  try {
    const { uri } = await Print.printToFileAsync({ html });
    updateExamination({ pdfUrlSrc: uri });
    
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share your TB Risk Result',
        UTI: 'com.adobe.pdf',
      });
    } else {
      console.warn('Sharing is not available on this platform');
    }
  } catch (error) {
    console.error('Error creating or sharing PDF:', error);
    throw error;
  }
};