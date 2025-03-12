import { Examination } from '@/models/Examination';
import { CoughDuration, LungFeature, KeySite } from "@/models/enums";

export const mockExamination: Examination = {
  examinationId: "1001",
  patientId: "1001",
  userId: 500,
  date: new Date("2025-07-15T09:30:00Z"),
  patientName: "Jane Doe",
  patientAge: 34,
  patientLocalisation: "Khayelitsha Hospital",
  symptomWeightLoss: true,
  symptomNightSweats: false,
  symptomFever: true,
  symptomCough: true,
  symptomCoughDuration: CoughDuration.LONG,
  symptomHouseholdTBContact: true,
  images: [
    {
      imageId: "1",
      date: new Date("2023-06-20T11:30:00Z"),
      uri: "@/assets/images/mockUltrasound.png",
      keySite: KeySite.APXD,
      label: LungFeature.DRY_LUNG,
    },
    {
      imageId: "2",
      date: new Date("2023-07-15T09:50:00Z"),
      uri: "@/assets/images/mockUltrasound.png",
      keySite: KeySite.QAID,
      label: LungFeature.SUBPLEURAL_CONSOLIDATIONS,
    },
    {
      imageId: "3",
      date: new Date("2023-07-15T09:45:00Z"),
      uri: "@/assets/images/mockUltrasound.png",
      keySite: KeySite.PAD,
      label: LungFeature.CONSOLIDATIONS,
    },
    {
      imageId: "4",
      date: new Date("2023-07-15T09:50:00Z"),
      uri: "@/assets/images/mockUltrasound.png",
      keySite: KeySite.QAID,
      label: LungFeature.SUBPLEURAL_CONSOLIDATIONS,
    },
  ],
  tbRisk: 75.0,
  ultrAiSign: 75.0,
  ultrAi: 73.5,
  recommendedAction: "Immediate referral for TB treatment is recommended.",
  note: "Patient shows signs consistent with TB infection. Further diagnostics are required.",
  pdfUrlSrc: "",
};