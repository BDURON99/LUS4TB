import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ImageCountRowProps {
  number: number;
}

/**
 * The ImageCountRow component displays the number of images captured.
 * @param number - The number of images captured.
 * @returns 
 */
const ImageCountRow: React.FC<ImageCountRowProps> = ({ number }) => {
    let capture = 'capture';
    if (number > 1){
        capture += 's';
    } 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{number} {capture}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default ImageCountRow;