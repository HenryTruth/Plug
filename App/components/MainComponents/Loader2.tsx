/* eslint-disable prettier/prettier */
import React, { useEffect, FC } from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

import loader from '../../assets/others/spinner.json';

const {height, width} = Dimensions.get('window');

interface LoaderProps {
    endLoading: () => void
}

const Loader2:FC<LoaderProps> = ({endLoading}):JSX.Element => {

    useEffect(() => {
        const clearLoading = () => {
            setTimeout(() => {
                endLoading();
            }, 500);
        };
        clearLoading();
    }, [endLoading]);


    return (
        <View style={styles.container}>
            <LottieView source={loader} autoPlay loop />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: height - 100,
    width: width,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
});

export default Loader2;
