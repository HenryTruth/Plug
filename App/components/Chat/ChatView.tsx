/* eslint-disable prettier/prettier */
import React, {useState, FC, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  BackHandler,
  Keyboard,
  EmitterSubscription,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import * as actionTypes from '../../redux/actions/actionTypes';
import { getMessage } from '../../redux/actions/message';

import ChatHeader from './ChatHeader';
import ChatInputBar from './ChatInputBar';
import ChatItem from './ChatItem';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';

const {height} = Dimensions.get('window');

interface ChatViewProps {
  user: any;
}


let newSocket : any;
// let updatechatContact :any;
const ChatView: FC<ChatViewProps> = ({user}): JSX.Element => {
  const [newHeight, setHeight] = useState(height - 165);
  const [online, setOnline] = useState(false);
  const dispatch = useDispatch();
  
  // const [socketId, setSocketId] : any = useState()
  // const profileIdDa= useSelector((state:any) => state.profileReducer.profileIdData);
  const [chats, setChats]: any = useState([]);
  const profileIdData = useSelector(
    (state: any) => state.profileReducer.profileIdData,
  );
  const updatedContactData = useSelector(
    (state: any) => state.profileReducer.chatContactData,
  );

  const previousConverstion = useSelector((state:any) => state.messageReducer.conversation);
  // console.log(previousConverstion, 'conversation')
  console.log(updatedContactData, 'contact sata');

  const socketId = profileIdData.socketId;
  // const updatechatContact : any = useRef()


  // console.log(previousConverstion, 'prev')

  useEffect(() => {
    console.log('first useEffect');
    // setChats([]);
    dispatch(getMessage(user.receiverId, socketId));
    if (previousConverstion.length !== 0){
      setChats((prev:any) => [...previousConverstion, ...prev]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,  socketId, user.receiverId]);

  useEffect(() => {

    // dispatch(getMessage(user.receiverId, socketId));
    newSocket = io('https://findplug.herokuapp.com',{query:{id:socketId}});
    console.log('useEffect called');
    newSocket.on('connect', () => {

        setOnline(true);
      console.log('you are connected from chat view');
      newSocket.emit('chat', 'can we chat');

      if (updatedContactData.length === 0){
        const convResult = [];
        const lastIndex = previousConverstion.length - 1;
        const prevConv = previousConverstion[lastIndex];
        convResult.push(prevConv);
        console.log(convResult);
        dispatch({
          type: actionTypes.CHAT_CONTACT,
          chatContactData: convResult,
        });
      }

      newSocket.on('receive', (msg: any, Rid:any, Sid:any, senderUsername:any, senderImage:any) => {
        console.log('incoming message', msg, Rid, Sid);
        let data = {
          senderId: Sid,
          receiverId: Rid,
          message: msg,
          senderUsername:senderUsername,
          senderImage:senderImage,
          receiverUsername:user.username,
          receiverImage:user.image,
          online:online,
          time: new Date().toLocaleTimeString().slice(0,5),
          isRead:true,
        };
        console.log(data);
        setChats((prev: any) => [...prev, data]);

        console.log(data);

        const updatechatContact = updatedContactData.filter(
          (e: {receiverId: string}) => e.receiverId !== data.receiverId,
        );
        updatechatContact.unshift(data);
        dispatch({
          type: actionTypes.CHAT_CONTACT,
          chatContactData: updatechatContact,
        });
      });

      // console.log(newSocket)
    });


    // setOnline(false);
    // return () => newSocket.close();

    return () => {
      newSocket.off('receive');
      newSocket.disconnect();
    };


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, online, socketId, updatedContactData, user.image, user.receiverId, user.username]);

  // useEffect(() => {
  //   console.log('did comon mount');
  //   setChats([]);
  //   console.log(user.receiverId, socketId);
  //   dispatch(getMessage(user.receiverId, socketId));
  //   setChats((prev:any) => [...previousConverstion, ...prev]);
  // },[dispatch, socketId, user.receiverId]);

  // console.log(chats, 'chats')




  const sendMessage = (msg: any, Rid: string, Sid: string) => {
    console.log('emitted');
    newSocket.emit('send', msg, Rid, Sid, user.username, user.image, online, new Date().toLocaleTimeString().slice(0,5));
    dispatch(getMessage(user.receiverId, socketId));
    let data = {
      senderId: Sid,
      receiverId: Rid,
      message: msg,
      receiverUsername:user.username,
      senderUsername:profileIdData.username,
      senderImage:profileIdData.profilePic,
      receiverImage:user.image,
      online:online,
      time: new Date().toLocaleTimeString().slice(0,5),
      isRead:true,

    };
    setChats((prev: any) => [...prev, data]);

    const updatechatContact = updatedContactData.filter(
      (e: {receiverId: string}) => e.receiverId !== data.receiverId,
    );
    console.log(updatechatContact, '[chat contact]');
    updatechatContact.unshift(data);

    dispatch({
      type: actionTypes.CHAT_CONTACT,
      chatContactData: updatechatContact,
    });
  };

  // const senderId = useSelector((state:any) => state.profileReducer.profileId);
  // console.log(senderId, user, user.username);
  const [text, setText] = useState<any>();
  // 'Hello there i am' + username + ", I think we've met somewhere in school"

  const goBack = () => {
      dispatch({type: actionTypes.OPEN_CHAT, value: null});
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', goBack);

  useEffect(() => {
    let keyboardDidShowListener: EmitterSubscription;
    // let keyboardDidHideListener: EmitterSubscription;

    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    // keyboardDidHideListener = Keyboard.addListener(
    //   'keyboardDidHide',
    //   keyboardDidHide,
    // );

    return () => {
      if (keyboardDidShowListener) {
        keyboardDidShowListener.remove();
      }
    };
  }, []);

  const keyboardDidShow = (e: any) => {
    setHeight(e.endCoordinates.height - 45);
  };

  // const keyboardDidHide = () => {
  //   setHeight(height - 165);
  // };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets) {
        const data = response.assets[0].uri;
        console.log();
        sendMessage(data, user.receiverId, socketId);
        // dispatch({type: actionTypes.SET_PROFILE_PIC, profilePic: data});
      }
    });
  };

  const submitMessageHandler = (msg: any) => {
    // console.log(msg, user.receiverId, 'reci');
    console.log(socketId, msg, user.receiverId);
    sendMessage(msg, user.receiverId, socketId);
    setText('');
  };

  return (
    <View style={styles.container}>
      <ChatHeader username={user.username} online={online} active back={goBack} />
      <View style={[styles.chatSection, {height: newHeight}]}>
        {chats.length !== 0 ? (
          <FlatList
            data={chats}
            // keyExtractor={item => item._id}
            renderItem={({item}) => (
              <ChatItem
                id={item.senderId}
                rec={user.receiverId}
                message={item.message}
                receiverId={item.receiverId}
                socket={socketId}
              />
            )}
          />
        ) : null}
      </View>
      <ChatInputBar
        text={text}
        setText={(e: string) => setText(e)}
        openGallery={openGallery}
        send={(msg: string) => submitMessageHandler(msg)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
  chatSection: {
    height: height - 165,
    backgroundColor: '#fff',
  },
});

export default ChatView;
