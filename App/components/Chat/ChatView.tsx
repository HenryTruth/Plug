/* eslint-disable prettier/prettier */
import React, {useState, FC, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  BackHandler,
} from 'react-native';
import {useDispatch} from 'react-redux';

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

const SOCKET_URL = io('https://findplug.herokuapp.com');
let socket : any;
const ChatView: FC<ChatViewProps> = ({user}): JSX.Element => {

    useEffect(() => {
         socket = SOCKET_URL;
         socket.on('connect', () => {
             console.log('you are now connected');
         });
    },[]);

    const sendMessage = (message: string, id: string) => {
        socket.emit('send-message', message, id);
    };

    const senderId = useSelector((state:any) => state.profileReducer.profileId);
    // console.log(senderId, user, user.username);
    const username = useSelector((state:any) => state.authReducer.username);
    const dispatch = useDispatch();
    const [text, setText] = useState<any>();
    const [chats] = useState([
        {
            receiverId:user.userId,
            receiverName: user.username,
            message:'Hello there I am ' + username + ", I think we've met somewhere in school",
            senderId:senderId,
            senderName:username,
        },
        {
            id: 1,
            sender: 'maria',
            senderId: 3,
            message:
                'hi i am ' +  user.username + "I don't think I remember seeing you. Mind sending me another of your pic? " ,
            },
    ]);

    const goBack = () => {
        dispatch({type: actionTypes.OPEN_CHAT, value: null});
        return true;
    };

    const submitMessageHandler = (msg:string, id:string) => {
        console.log(msg, senderId);
        sendMessage(msg, id);
        setText('');

    };

    BackHandler.addEventListener('hardwareBackPress', goBack);

  return (
    <View style={styles.container}>
      <ChatHeader username={user.username} active back={goBack} />
      <View style={styles.chatSection}>
        <FlatList
          data={chats}
          keyExtractor={item => item.senderId}
          renderItem={({item}) => (
            <ChatItem id={item.senderId} message={item.message} />
          )}
        />
      </View>
      <ChatInputBar text={text} setText={(e: string) => setText(e)}  send={(msg:string) => submitMessageHandler(msg, user.userId)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: '100%',
    backgroundColor: '#fff',
  },
  chatSection: {
    height: height - 135,
    backgroundColor: '#FFF',
  },
});

export default ChatView;
