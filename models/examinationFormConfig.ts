export type FormFieldConfig = {
    key: string;
    label: string;
    type: 'text' | 'radio';
    options?: string[];
    category: string;
};

export const examinationFormConfig: FormFieldConfig[] = [
    {
        key: 'name',
        label: 'Name',
        type: 'text',
        category: 'Demographics',
      },
      {
        key: 'age',
        label: 'Age',
        type: 'text',
        category: 'Demographics',
      },
      {
        key: 'location',
        label: 'Location',
        type: 'text',
        category: 'Demographics',
      },
      {
        key: 'symptomHouseholdTBContact',
        label: 'Household TB Contact',
        type: 'radio',
        options: ['Yes', 'No'],
        category: 'Symptoms',
      },
      {
        key: 'symptomCough',
        label: 'Cough',
        type: 'radio',
        options: ['Yes', 'No'],
        category: 'Symptoms',
      },
      {
        key: 'symptomCoughDuration',
        label: 'Cough Duration',
        type: 'radio',
        options: ['Less than 1 week', '1-3 weeks', 'More than 3 weeks'],
        category: 'Symptoms',
      },
      {
        key: 'symptomNightSweats',
        label: 'Night Sweats',
        type: 'radio',
        options: ['Yes', 'No'],
        category: 'Symptoms',
      },
      {
        key: 'symptomFever',
        label: 'Fever',
        type: 'radio',
        options: ['Yes', 'No'],
        category: 'Symptoms',
      },
      {
        key: 'symptomWeightLoss',
        label: 'Weight Loss',
        type: 'radio',
        options: ['Yes', 'No'],
        category: 'Symptoms',
      },
];