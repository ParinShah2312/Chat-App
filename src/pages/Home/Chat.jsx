import { useParams } from 'react-router-dom/cjs/react-router-dom';
import ChatBottom from '../../components/chat-window/bottom';
import Messages from '../../components/chat-window/messages';
import ChatTop from '../../components/chat-window/top';
import { useRooms } from '../../context/rooms.context';
import { Loader } from 'rsuite';
import { CurrentRoomProvider } from '../../context/current-room.context';
import { transformToArr } from '../../misc/helper';
import { auth } from '../../misc/firebase';
import { useEffect } from 'react';

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();

  useEffect(() => {
    window.chatId = chatId;
  }, [chatId]);

  if (!rooms) {
    return <Loader center vertical content="Loading" speed="slow" size="md" />;
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
  }

  const { name, description } = currentRoom;

  const admins = transformToArr(currentRoom.admins);
  const fcmUsers = transformToArr(currentRoom.fcmUsers);
  const isAdmin = admins.includes(auth.currentUser.uid);
  const isReceivingFcm = fcmUsers.includes(auth.currentUser.uid);

  const currentRoomData = {
    name,
    description,
    admins,
    isAdmin,
    isReceivingFcm,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
