import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Examination } from '@/models/Examination';
import { saveExamination } from '@/services/examinationService';
import { KeySite } from '@/models/enums';

/**
 * The ExaminationContextType defines the shape of the examination context.
 * It contains the current examination, functions to set, update, and clear the examination, and the selected site.
 * 
 * @property examination - The current examination.
 * @property setExamination - A function to set the current examination.
 * @property updateExamination - A function to update the current examination.
 * @property clearExamination - A function to clear the current examination.
 * @property selectedSite - The selected site for the examination.
 * @property setSelectedSite - A function to set the selected site.
 */
type ExaminationContextType = {
  examination: Examination | null;
  setExamination: (exam: Examination) => void;
  updateExamination: (updates: Partial<Examination>) => void;
  clearExamination: () => void;
  selectedSite: KeySite | null;
  setSelectedSite: (site: KeySite | null) => void;
};

/**
 * The ExaminationContext is the context for managing the current examination state.
 * It provides functions to set, update, and clear the examination.
 */
const ExaminationContext = createContext<ExaminationContextType | undefined>(undefined);

/**
 * The ExaminationProviderProps define the props for the ExaminationProvider component.
 * 
 * @property children - The children components to render.
 */
type ExaminationProviderProps = {
  children: ReactNode;
};

/**
 * The ExaminationProvider component provides the examination context to its children.
 * It manages the current examination state and provides functions to set, update, and clear the examination.
 * 
 * @param children - The children components to render. 
 * @returns 
 */
export const ExaminationProvider: React.FC<ExaminationProviderProps> = ({ children }) => {
  const [examination, setExaminationState] = useState<Examination | null>(null);
  const [selectedSite, setSelectedSite] = useState<KeySite | null>(null);

  // Set the examination both in state and persist it locally.
  const setExamination = (exam: Examination) => {
    setExaminationState(exam);
    // Persist the examination by appending it to stored examinations.
    saveExamination(exam).catch((error) => {
      console.error('Error saving examination:', error);
    });
  };

  // Update the current examination by merging new updates.
  const updateExamination = (updates: Partial<Examination>) => {
    setExaminationState((prev) => (prev ? { ...prev, ...updates } : null));
  };

  // Clear the current examination from state.
  const clearExamination = () => {
    setExaminationState(null);
    setSelectedSite(null);
  };

  return (
    <ExaminationContext.Provider
      value={{
        examination, 
        setExamination, 
        updateExamination, 
        clearExamination, 
        selectedSite,
        setSelectedSite,
      }}
    >
      {children}
    </ExaminationContext.Provider>
  );
};

/**
 * The useExamination hook returns the examination context.
 * 
 * @returns The examination context.
 */
export const useExamination = (): ExaminationContextType => {
  const context = useContext(ExaminationContext);
  if (context === undefined) {
    throw new Error('useExamination must be used within an ExaminationProvider');
  }
  return context;
};