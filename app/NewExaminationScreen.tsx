import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Form, { FormFieldValues } from '@/components/form/Form';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/components/ui/button';
import colors from '@/assets/colors';
import { useExamination } from '@/context/examinationContext';
import { Examination } from '@/models/Examination';
import * as Crypto from 'expo-crypto';
import { useMarkers } from '@/context/markersContext';

/**
 * The NewExaminationScreen component allows the user to enter patient information for a new examination.
 * The user can enter the patient's name, age, location, and symptoms.
 * @returns 
 */
const NewExaminationScreen: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<{ getFormData: () => FormFieldValues }>(null);
  const { setExamination, setSelectedSite } = useExamination();
  const { resetMarkers } = useMarkers();

  useLayoutEffect(() => {
    navigation.setOptions({ title: null });
  }, [navigation])

  const onSubmitForm = () => {
    if (formRef.current) {
      const formData = formRef.current.getFormData();

      const newExam: Examination = {
        examinationId: Crypto.randomUUID(),
        patientId: Crypto.randomUUID(), 
        userId: 1,
        date: new Date(),
        patientName: formData.name,
        patientAge: Number(formData.age),
        patientLocalisation: formData.location,
        symptomCough: formData.symptomCough.toLowerCase() === 'yes',
        symptomCoughDuration: formData.symptomCoughDuration as any, 
        symptomHouseholdTBContact: formData.symptomHouseholdTBContact.toLowerCase() === 'yes',
        symptomWeightLoss: formData.symptomWeightLoss.toLowerCase() === 'yes',
        symptomNightSweats: formData.symptomNightSweats.toLowerCase() === 'yes',
        symptomFever: formData.symptomFever.toLowerCase() === 'yes',
        images: [],
        tbRisk: 0,
        ultrAiSign: 0,
        ultrAi: 0,
        recommendedAction: '',
        note: '',
        pdfUrlSrc: '',
      };

    // Update global examination state and persist it 
    setExamination(newExam);
    setSelectedSite(null);
    resetMarkers();
    router.push('/CaptureMethodSelectionScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>
      <ScrollView >
        <View style={styles.container}>
        <Text style={styles.headerTitle}>Enter Patient Information</Text>
        <Form ref={formRef} getFormData={function (): FormFieldValues {
            throw new Error('Function not implemented.');
          } } />
        <Button className="rounded-full" onPress={onSubmitForm}>
          <ButtonText>Next</ButtonText>
        </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    width: '100%',
    marginBottom: 30,
    justifyContent: 'flex-start',
  },

});

export default NewExaminationScreen;