import colors from '@/assets/colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-rapi-ui';

type ExaminationHeaderProps = {
  patientName: string;
  patientAge: number;
};

/**
 * The ExaminationHeader component displays the title and patient information of an examination record.
 * @param patientName The name of the patient
 * @param patientAge The age of the patient 
 * @returns 
 */
const ExaminationHeader: React.FC<ExaminationHeaderProps> = ({ patientName, patientAge }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examination Record</Text>
      <Text style={styles.info}>{patientName} - Age: {patientAge}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.lightCardBackground,
    borderRadius: 8,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    color: 'black',
  },
});

export default ExaminationHeader;