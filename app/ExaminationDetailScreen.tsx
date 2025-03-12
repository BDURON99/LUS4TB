import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import { Text } from 'react-native-rapi-ui';
import ResultCategoryRow from '@/components/result/ResultCategoryRow';
import ResultRow from '@/components/result/ResultRow';
import ExaminationHeader from '@/components/examination/ExaminationHeader';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/assets/colors';
import { deleteExamination } from '@/services/examinationService';
import { Button, ButtonText } from '@/components/ui/button';
import { useExamination } from '@/context/examinationContext';

/**
 * The ExaminationDetailScreen component displays the details of a single examination.
 * The user can view the patient information, symptoms, ultrasound analysis, recommended action, additional notes, and ultrasound images.
 * The user can also delete the examination from this screen.
 * @returns 
 */
const ExaminationDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const { examination, clearExamination } = useExamination();

  if (!examination) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text style={styles.errorText}>No Examination Data Found</Text>
        <Button className="rounded-full" onPress={() => router.back()}>
          <ButtonText>Back</ButtonText>
        </Button>
      </SafeAreaView>
    );
  }

  const examDate = new Date(examination.date).toLocaleDateString();

  const symptoms = [
    { label: 'Weight Loss', value: examination.symptomWeightLoss ? 'Yes' : 'No' },
    { label: 'Night Sweats', value: examination.symptomNightSweats ? 'Yes' : 'No' },
    { label: 'Fever', value: examination.symptomFever ? 'Yes' : 'No' },
    { label: 'Cough', value: examination.symptomCough ? 'Yes' : 'No' },
    { label: 'Cough Duration', value: examination.symptomCoughDuration },
    { label: 'Household TB Contact', value: examination.symptomHouseholdTBContact ? 'Yes' : 'No' },
  ];

  const ultrasoundAnalysis = [
    { label: 'TB Risk', value: `${examination.tbRisk.toFixed(1)}%` },
    { label: 'UltrAI Sign', value: `${examination.ultrAiSign.toFixed(1)}%` },
    { label: 'UltrAI', value: `${examination.ultrAi.toFixed(1)}%` },
  ];

  const handleDelete = async () => {
    Alert.alert(
      'Delete Examination',
      'Are you sure you want to delete this examination?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive', onPress: async () => {
            await deleteExamination(examination.examinationId);
            clearExamination();
            router.dismissAll();
            router.replace('/');
          }
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: null });
  }, [navigation]);

  useEffect(() => {
    return () => {
      clearExamination();
    };
  }, [clearExamination]);

  return (
    <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>
      <ScrollView>
        {/* Header with patient info */}
        <ExaminationHeader
          patientName={examination.patientName}
          patientAge={examination.patientAge}
        />

        {/* Patient Information */}
        <View style={styles.section}>
          <ResultCategoryRow category="Patient Information" />
          <ResultRow text={`Patient ID: ${examination.patientId}`} />
          <ResultRow text={`Localisation: ${examination.patientLocalisation}`} />
          <ResultRow text={`Examination Date: ${examDate}`} />
        </View>

        {/* Symptoms */}
        <View style={styles.section}>
          <ResultCategoryRow category="Symptoms" />
          {symptoms.map((item, index) => (
            <ResultRow key={index} text={`${item.label}: ${item.value}`} />
          ))}
        </View>

        {/* Ultrasound Analysis */}
        <View style={styles.section}>
          <ResultCategoryRow category="Ultrasound Analysis" />
          {ultrasoundAnalysis.map((item, index) => (
            <ResultRow key={index} text={`${item.label}: ${item.value}`} />
          ))}
        </View>

        {/* Recommended Action */}
        <View style={styles.section}>
          <ResultCategoryRow category="Recommended Action" />
          <ResultRow text={examination.recommendedAction} />
        </View>

        {/* Additional Notes */}
        <View style={styles.section}>
          <ResultCategoryRow category="Additional Notes" />
          <ResultRow text={examination.note} />
        </View>

        {/* Ultrasound Images Section */}
        <View style={styles.section}>
          <ResultCategoryRow category="Ultrasound Images" />
          {examination.images && examination.images.length > 0 ? (
            <View style={styles.imageContainer}>
              {examination.images.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img.uri }}
                  style={styles.examImage}
                  resizeMode="contain"
                />
              ))}
            </View>
          ) : (
            <Text>No ultrasound images available.</Text>
          )}
        </View>
        {/* Delete Button */}
        <View style={styles.deleteButtonContainer}>
          <Button onPress={handleDelete} variant="outline" className="rounded-full" style={styles.deleteButton}>
            <ButtonText>Delete Examination</ButtonText>
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
    padding: 20,
    paddingTop: 0,
  },
  container: {
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    width: '100%',
    marginBottom: 30,
    justifyContent: 'flex-start',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  section: {
    marginVertical: 12,
  },
  imageContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  examImage: {
    width: '100%',
    height: 200,
    marginVertical: 8,
  },
  deleteButtonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  deleteButton: {
    width: '80%',
  },
});

export default ExaminationDetailScreen;