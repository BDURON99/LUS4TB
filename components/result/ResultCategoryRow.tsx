import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

type ResultCategoryRowProps = {
  category: string;
};

/**
 * The ResultCategoryRow component displays a category name in the results screen.
 * @param category - The name of the category to display.
 * @returns 
 */
const ResultCategoryRow: React.FC<ResultCategoryRowProps> = ({ category }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>{category}</Text>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    borderBottomWidth: 1,
    backgroundColor: '#eee',
    width: '100%',
  },
});

export default ResultCategoryRow;