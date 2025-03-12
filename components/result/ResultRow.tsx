import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-rapi-ui';

type ResultRowProps = {
  text: string;
};

/**
 * The ResultRow component displays a row of text in the results screen.
 * @param text - The text to display in the row.
 * @returns 
 */
const ResultRow: React.FC<ResultRowProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default ResultRow;