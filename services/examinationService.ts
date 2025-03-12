import AsyncStorage from '@react-native-async-storage/async-storage';
import { Examination } from '@/models/Examination';
import * as Crypto from 'expo-crypto';
import { CoughDuration } from '@/models/enums';

const STORAGE_KEY = 'examinations';

export const newExam: Examination = {
  examinationId: Crypto.randomUUID(),
  patientId: Crypto.randomUUID(),
  userId: 1,
  date: new Date(),
  patientName: '',
  patientAge: 0,
  patientLocalisation: '',
  symptomCough: false,
  symptomCoughDuration: CoughDuration.SHORT, 
  symptomHouseholdTBContact: false,
  symptomWeightLoss: false,
  symptomNightSweats: false,
  symptomFever: false,
  images: [],
  tbRisk: 0,
  ultrAiSign: 0,
  ultrAi: 0,
  recommendedAction: '',
  note: '',
  pdfUrlSrc: '',
};

/**
 * Save an examination.
 * @param exam - The examination to save
 */
export const saveExamination = async (exam: Examination) => {
  try {
    const storedExams = await AsyncStorage.getItem(STORAGE_KEY);
    const exams = storedExams ? JSON.parse(storedExams) : [];
    exams.push(exam);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
  } catch (error) {
    console.error('Error saving examination:', error);
  }
};

/**
 * Retrieve all saved examinations.
 * @returns A list of all saved examinations
 */
export const getExaminations = async (): Promise<Examination[]> => {
  try {
    const storedExams = await AsyncStorage.getItem(STORAGE_KEY);
    return storedExams ? JSON.parse(storedExams) : [];
  } catch (error) {
    console.error('Error retrieving examinations:', error);
    return [];
  }
};

/**
 * Update an examination.
 * @param updatedExam - The updated examination to save
 */
export const updateExamination = async (updatedExam: Examination) => {
  try {
    const storedExams = await AsyncStorage.getItem(STORAGE_KEY);
    const exams = storedExams ? JSON.parse(storedExams) : [];
    const updatedExams = exams.map((exam: Examination) =>
      exam.examinationId === updatedExam.examinationId ? updatedExam : exam
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExams));
  } catch (error) {
    console.error('Error updating examination:', error);
  }
};

/**
 * Delete an examination
 * @param examinationId - The ID of the examination to delete
 */
export const deleteExamination = async (examinationId: string) => {
  try {
    const storedExams = await AsyncStorage.getItem(STORAGE_KEY);
    const exams = storedExams ? JSON.parse(storedExams) : [];
    const updatedExams = exams.filter((exam: Examination) => exam.examinationId !== examinationId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExams));
  } catch (error) {
    console.error('Error deleting examination:', error);
  }
};

/**
 * Delete all saved examinations
 */
export const deleteAllExaminations = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error deleting all examinations:', error);
  }
};