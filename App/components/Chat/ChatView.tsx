import React, { useState, FC, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, BackHandler, Keyboard, EmitterSubscription, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import * as actionTypes from '../../redux/actions/actionTypes';

import ChatHeader from './ChatHeader';
import ChatInputBar from './ChatInputBar';
import ChatItem from './ChatItem';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';

const {height} = Dimensions.get('window');

interface ChatViewProps {
  user: any;
}
    

// receiver username ---> userprops
// // receiver is_online
// lastmessage ---> message[0]
// image ---> user

let newSocket : any;
const ChatView: FC<ChatViewProps> = ({user}): JSX.Element => {
    const [newHeight, setHeight] = useState(height - 135)
  const dispatch = useDispatch();
  // const [socketId, setSocketId] : any = useState()
  // const profileIdDa= useSelector((state:any) => state.profileReducer.profileIdData);
  const [chats, setChats] : any = useState([
  ]);
  const profileIdData = useSelector((state:any) => state.profileReducer.profileIdData);
  const updatedContactData = useSelector((state:any) => state.profileReducer.chatContactData);
  console.log(updatedContactData, 'contact sata')

  const socketId = profileIdData.socketId;
    useEffect(() => {
      console.log('useEffect called');
         newSocket  = io('https://findplug.herokuapp.com', { query : {id:user.receiverId}});
         newSocket.on('connect', () => {
             console.log('you are now connected');
         });
         newSocket.on('receive-message', (msg:string, Sid:string, Rid:string) => {
           console.log(msg + ' anything')
          let data = {
            senderId:Sid,
            receiverId:Rid,
            message:msg,
          };
          setChats((prev: any) => [...prev, data]);
         });
         return () => newSocket.close();
    },[chats, user.receiverId]);

    const sendMessage = (msg: string, Rid: string, Sid:string) => {
        newSocket.emit('send-message', msg, Rid, Sid);
        let data = {
          senderId:Sid,
          receiverId:Rid,
          message:msg,
        };
        setChats((prev: any) => [...prev, data]);
        const chatViewData = {
          receiverId:Rid,
          receiverUsername:user.username,
          lastmessage:msg,
          receiverImage:user.image,
          time:new Date().toLocaleTimeString(),
        };

        const updatechatContact = updatedContactData.filter((e: { receiverId: string; }) => e.receiverId !== chatViewData.receiverId);
        updatechatContact.unshift(chatViewData);

        dispatch({type:actionTypes.CHAT_CONTACT, chatContactData:updatechatContact});


    };



    // const senderId = useSelector((state:any) => state.profileReducer.profileId);
    // console.log(senderId, user, user.username);
    const [text, setText] = useState<any>();
    // 'Hello there i am' + username + ", I think we've met somewhere in school"

    const goBack = () => {
        dispatch({type: actionTypes.OPEN_CHAT, value: null });
        return true
    }

    BackHandler.addEventListener('hardwareBackPress', goBack );

    useEffect(() => {
        let keyboardDidShowListener: EmitterSubscription;
        let keyboardDidHideListener: EmitterSubscription;

        keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        return () => {
            if (keyboardDidShowListener) {
                keyboardDidShowListener.remove();
            }
        };
    }, []);

    const keyboardDidShow = (e: any) => {
        setHeight(e.endCoordinates.height - 15);
    }

    const keyboardDidHide = (e: any) => {
        setHeight(height - 135)
    };

    const openGallery = () => {
        launchImageLibrary(
            {mediaType: 'photo'},
            (response) => {
                if (response.assets) {
                const data = response.assets[0].uri;
                console.log(data);
                dispatch({type: actionTypes.SET_PROFILE_PIC, profilePic:data});
                }
            },
        );
    }

    const submitMessageHandler = (msg:string) => {
        console.log(msg, user.receiverId);
        sendMessage(msg, user.receiverId, socketId);
        setText('');

    };

  return (
    <View style={styles.container}>
      <ChatHeader username={user.username} active back={goBack} />
      <View style={styles.chatSection}>
        {chats.length !== 0 ?
        <FlatList
        data={chats}
        keyExtractor={item => item.senderId}
        renderItem={({item}) => (
          <ChatItem id={item.senderId} message={item.message} socket={socketId}/>
        )}
      /> : null}
      </View>
      <ChatInputBar text={text} setText={(e: string) => setText(e)} openGallery={openGallery}  send={(msg:string) => submitMessageHandler(msg)} />
    </View>
  );
}; 

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff'
    },
    chatSection: {
        height: height - 135,
        backgroundColor: '#fff'
    }
})

export default ChatView;
