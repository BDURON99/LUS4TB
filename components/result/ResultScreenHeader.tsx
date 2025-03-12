import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-rapi-ui';

/**
 * The ResultScreenHeader component displays a header for the results screen.
 * This component could be used as general header, to display the title for all screens.
 * @returns 
 */
const ResultScreenHeader: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Results</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    width: '100%',
    marginBottom: 30,
    justifyContent: 'flex-start',
  },
});

export default ResultScreenHeader;