import { CoughDuration, LungFeature } from "./enums";
import { Image } from "./Image";

export interface Examination {
  examinationId: string;
  patientId: string;
  userId: number;
  date: Date; // Date of examination
  patientName: string;
  patientAge: number;
  patientLocalisation: string;
  symptomCough: boolean;
  symptomCoughDuration: CoughDuration;
  symptomHouseholdTBContact: boolean;
  symptomWeightLoss: boolean;
  symptomNightSweats: boolean;
  symptomFever: boolean;
  images: Image[];
  tbRisk: number;  // in %
  ultrAiSign: number;   // in %
  ultrAi: number;    // in %   
  lungFeatureResults?: { [key in LungFeature]: number }; // in %
  recommendedAction: string;
  note: string;
  pdfUrlSrc: string;
  imageAcquisitionMethod?: 'capture' | 'upload';
}