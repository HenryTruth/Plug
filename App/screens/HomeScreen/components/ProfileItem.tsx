/* eslint-disable prettier/prettier */
import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// const image = require('../../../assets/images/girl.jpg');
const verifiedIcon = require('../../../assets/images/verified.png');
const backgroungImage = require('../../../assets/images/emptyimage.png');

interface profileProps {
  username: string;
  level: number;
  department: string;
  image: any;
  verified: boolean;
  index: number;
  setIndex: (e: number) => void;
}

const ProfileItem: FC<profileProps> = ({
    username,
    level,
    department,
    image,
    verified,
    index,
    setIndex,
  }): JSX.Element => {

  return (
    <TouchableWithoutFeedback onPress={() => setIndex(index)}>
      <View style={styles.container}>
        <View style={styles.main}>
          <ImageBackground source={{uri:image}} style={styles.backgroundImage}>
            <LinearGradient
              colors={[
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.4)',
                'rgba(0, 0, 0, 0.5)',
                'rgba(0, 0, 0, 0.7)',
              ]}
              style={styles.details}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>{username}</Text>
                {verified && <Image source={verifiedIcon} />}
              </View>
              <Text style={styles.department}>
                {level}l, {department}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 260,
    width: '50%',
  },
  main: {
    height: 250,
    width: '94%',
    backgroundColor: '#E60025',
    marginTop: 5,
    marginLeft: '3%',
    borderRadius: 11,
    overflow: 'hidden',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  details: {
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    paddingTop: 10,
  },
  usernameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  username: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    paddingRight: 5,
  },
  department: {
    color: '#fff',
    opacity: 0.7,
    paddingLeft: 5,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileItem;
