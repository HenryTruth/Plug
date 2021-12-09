/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {
  View,
} from 'react-native';
import EmojiHeader from './components/EmojiHeader';
import StatusBar from './components/StatusBar';

const SignupScreensView: FC = () => {
  return (
    <View>
      <EmojiHeader />
      <StatusBar />
    </View>
  );
};


export default SignupScreensView;
