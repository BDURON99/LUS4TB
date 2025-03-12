import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import ExaminationListItem from '@/components/examination/ExaminationListItem';
import { Examination } from '@/models/Examination';
import { getExaminations } from '@/services/examinationService';
import { mockExaminations } from '@/assets/mockExaminations';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/assets/colors';
import { useExamination } from '@/context/examinationContext';
import { Button, ButtonText } from '@/components/ui/button';
import { deleteAllExaminations } from '@/services/examinationService';


/**
 * The PreviousExaminations component displays a list of the previous saved examinations.
 * The user can view the details of a previous examination by clicking on it.
 * @returns 
 */
const PreviousExaminations: React.FC = () => {
  const navigation = useNavigation();
  const { examination, setExamination } = useExamination();

  const [exams, setExams] = useState<Examination[]>(mockExaminations);

  const loadExaminations = async () => {
    try {
      const loadedExams = await getExaminations();
      setExams(loadedExams);
    } catch (error) {
      console.error('Error loading examinations:', error);
    }
  };

  const handleItemPress = (exam: Examination) => {
    setExamination(exam);
    router.push({
      pathname: '/ExaminationDetailScreen',
      params: { exam: JSON.stringify(exam) },
    });
  };

  const onDeleteAllPreviousExams = () => {
    deleteAllExaminations();
    console.log('All previous exams deleted');
  }

  useLayoutEffect(() => {
    navigation.setOptions({ title: null });
  }, [navigation]);

  useEffect(() => {
    loadExaminations();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>
      <Text style={styles.headerTitle}>Previous Examinations</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {exams.length === 0 ?
          <Text>No examination saved yet. Start a new exam from the home screen.</Text>
          : exams.map((exam, index) => (
            <ExaminationListItem
              key={`${exam.examinationId}-${index}`}
              examination={exam}
              onPress={() => handleItemPress(exam)}
            />
          ))}
        <Button variant='outline' className="rounded-full info" onPress={onDeleteAllPreviousExams}>
          <ButtonText>Delete all Previous exams</ButtonText>
        </Button>
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
    paddingVertical: 10,
    gap: 20,
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

export default PreviousExaminations;