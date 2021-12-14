import React, {FC} from 'react';
import { View, Dimensions, Text, StyleSheet, ImageBackground } from 'react-native';
// import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

import { Username } from '../../../components/index';

const {width} = Dimensions.get('window');

interface NotificationProps {
    username: string,
    department: string,
    level: any,
    active: boolean,
    image: any
}

const NotificationItem:FC<NotificationProps> = ({username, department, level, active, image}):JSX.Element => {

    // const translateX = useSharedValue(0)

    // const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    //     onStart: (event) => {},
    //     onActive: (event) => {
    //         translateX.value = event.translationX
    //     },
    //     onEnd: (event) => {}
    // });

    // const rStyle = useAnimatedStyle(() => {
    //     return{
    //         transform: [
    //             {
    //                 translateX: translateX.value
    //             }
    //         ]
    //     }
    // })

    return(
        <View>
            {/* <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.container, rStyle]}>
                    <View style={styles.container1}>
                        <ImageBackground source={image} style={styles.image} />
                    </View>
                    <View style={styles.container2}>
                        <Username username={username} active={active} />
                        <Text style={styles.text}>{level} {department}</Text>
                    </View>
                </Animated.View>
            </PanGestureHandler> */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: width - 30,
        marginLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#d4d4d4',
        borderBottomWidth: 1,
        display:'flex',
        flexDirection: 'row'
    },
    container1: {
        width: 60,
        height: 80,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
        borderRadius: 6,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    container2: {
        height: 80,
        width: width - 110 ,
        justifyContent: 'center'
    },
    text: {
        color: '#808080',
        fontSize: 17,
    }
})

export default NotificationItem;