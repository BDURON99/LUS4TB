import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import FormCategoryRow from './FormCategoryRow';
import FormRow from './FormRow';
import { examinationFormConfig, FormFieldConfig } from '@/models/examinationFormConfig';

export type FormFieldValues = { [key: string]: string };

interface FormProps {
  getFormData: () => FormFieldValues;
}

/**
 * The Form component displays a form with fields for entering patient examination data.
 * The user can enter the patient's name, age, location, and symptoms.
 * @param ref The ref object to expose the getFormData method
 * @returns
 */
const Form = forwardRef<{ getFormData: () => FormFieldValues }, FormProps>((props, ref) => {

  const [examination, setExamination] = useState<FormFieldValues>(
    examinationFormConfig.reduce((acc, field: FormFieldConfig) => {
      acc[field.key] = '';
      return acc;
    }, {} as FormFieldValues)
  );

  // Extract unique categories from the config
  const categories = Array.from(
    new Set(examinationFormConfig.map((field) => field.category || 'Other'))
  );

  const formDataRef = useRef<FormFieldValues>({
    name: '',
    age: '',
    location: '',
    symptomCough: '',
    symptomCoughDuration: '',
    symptomHouseholdTBContact: '',
    symptomWeightLoss: '',
    symptomNightSweats: '',
    symptomFever: '',
  });

  useImperativeHandle(ref, () => ({
    getFormData: () => formDataRef.current,
  }));
  
  const handleFieldChange = (fieldKey: string, value: string) => {
    setExamination(prev => ({ ...prev, [fieldKey]: value }));
  };

  // Expose a method to get the current form data.
  useImperativeHandle(ref, () => ({
    getFormData: () => examination,
  }));

  return (
    <View style={styles.container}>
      {/** Group fields by category for simplicity **/}
      {Array.from(new Set(examinationFormConfig.map(field => field.category || 'Other'))).map(category => {
        const fieldsInCategory = examinationFormConfig.filter(field => (field.category || 'Other') === category);
        return (
          <React.Fragment key={category}>
            <FormCategoryRow title={category} />
            {fieldsInCategory.map(field => {
              // Only render cough duration if symptomCough is 'yes'
              if (field.key === 'symptomCoughDuration' && examination['symptomCough'].toLowerCase() !== 'yes') {
                return null;
              }
              return (
                <FormRow
                  key={field.key}
                  label={field.label}
                  type={field.type}
                  value={examination[field.key]}
                  onChangeText={(value) => handleFieldChange(field.key, value)}
                  options={field.options}
                  selectedOption={field.type === 'radio' ? examination[field.key] : undefined}
                  onSelectOption={field.type === 'radio' ? (value) => handleFieldChange(field.key, value) : undefined}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Form;