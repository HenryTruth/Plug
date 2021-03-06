/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');


interface ErrorScreenProps {
  reload: () => void
}
const ErrorScreen:FC<ErrorScreenProps> = ({reload}):JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Icons
          name="md-cloud-offline-outline"
          size={50}
          color="#000"
          style={styles.icon}
        />
        <Text style={styles.text}>Error fetching roomates</Text>
        <Text style={styles.commentText}>
          Please check your internet connection and try again
        </Text>
        <TouchableWithoutFeedback onPress={() => reload()}>
        <View style={styles.button}>
          <Text style={styles.reloadText}>Reload</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: width - 40,
    marginLeft: 20,
    marginTop: -100,
  },
  text: {
    color: '#000',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 5,
  },
  commentText: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
  icon: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  button: {
    height: 45,
    width: 130,
    backgroundColor: '#000',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reloadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
  },
});

export default ErrorScreen;
