import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function StudentChooseButton({title, style, onPress}) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, style, {backgroundColor: '#00CABA'}]}
      onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 8,
  },
  text: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
});