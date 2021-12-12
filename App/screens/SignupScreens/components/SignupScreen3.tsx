import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';

import EmojiHeader from './EmojiHeader';
import StatusBar from './StatusBar';
import ProfilePhoto from './ProfilePhoto';
import InterestBox from './InterestBox';
import ContinueButton from './ContinueButton';

const {height, width} = Dimensions.get('window');

const SignupScreen3 = () => {

    const [interests, setInterests] =  useState <any | null> ([]);
    const [profilePic, setProfilePic] = useState();

    const setImage = (img: any) => {
        setProfilePic(img)
    }

    const addInterest = (e: string) => {
        setInterests((prev: any) => [...prev, e]);
        console.log(interests)
    };

    const removeInterest = (e: string) => {
        const idx = interests.indexOf(e);
        let item = interests;
        item.splice(idx, 1);
        setInterests(item);
    }

    //Interest Containers
    const div1 = (
        <View style={styles.interestFlex}>
            <InterestBox interests={interests} small={false} name='Politics' postInterest={addInterest} deleteInterest={removeInterest} />
            <View style={styles.gap}/>
            <InterestBox interests={interests} small name='Books' postInterest={addInterest} deleteInterest={removeInterest} />
        </View>
    )
    const div2 = (
        <View style={styles.interestFlex}>
            <InterestBox interests={interests} small={true} name='Sports' postInterest={addInterest} deleteInterest={removeInterest} />
            <View  style={styles.gap}/>
            <InterestBox interests={interests} small={false} name='Fashion' postInterest={addInterest} deleteInterest={removeInterest} />
        </View>
    )
    const div3 = (
        <View style={styles.interestFlex}>
            <InterestBox interests={interests} small={false} name='Parties' postInterest={addInterest} deleteInterest={removeInterest} />
            <View  style={styles.gap}/>
            <InterestBox interests={interests} small name='Movies' postInterest={addInterest} deleteInterest={removeInterest} />
        </View>
    )
    const div4 = (
        <View style={styles.interestFlex}>
            <InterestBox interests={interests} small={true} name='Music' postInterest={addInterest} deleteInterest={removeInterest} />
            <View  style={styles.gap}/>
            <InterestBox interests={interests} small={false} name='Religion' postInterest={addInterest} deleteInterest={removeInterest} />
        </View>
    )
    

    return(
        <View style={styles.container}>
            <View style={styles.headerFlexer}>
                <Icons name='chevron-left' color='#000' size={25} />
                <EmojiHeader page={3} />
            </View>
            <StatusBar page={3} />
            <View style={styles.profileContainer}>
                <Text style={styles.header}>Profile</Text>
                <ProfilePhoto setImage={setImage} />
            </View>
            <View style={styles.interestContainer}>
                <Text style={styles.title}>Interest</Text>
                <View style={styles.interests}>
                    {div1}
                    {div2}
                    {div3}
                    {div4}
                </View>
                <ContinueButton label='Finish' />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: height,
        width: '100%',
    },
    headerFlexer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    profileContainer: {
        width: width - 30,
        marginLeft: 15,
        marginTop: 15
    },
    header: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 22,
    },
    interestContainer:{
        width: width - 30,
        marginLeft: 15,
        marginTop: 5,
        paddingTop: 15
    },
    title: {
        fontSize: 20,
        opacity: 0.6,
        color: '#000'
    },
    interests: {
        width: '100%',
        marginTop: 15
    },
    interestFlex: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10
    },
    gap:{
        width: '5%'
    }
})

export default SignupScreen3;