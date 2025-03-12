import colors from '@/assets/colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-rapi-ui';

type FormCategoryRowProps = {
  title: string;
};

/**
 * The FormCategoryRow component displays a category title in a form.
 * @param title The title of the category 
 * @returns 
 */
const FormCategoryRow: React.FC<FormCategoryRowProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text size="lg" style={styles.title}>
        {title}
      </Text>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    //paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc', 
    //width: 50,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
});

export default FormCategoryRow;