import { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helper';
import { off, onValue, ref } from 'firebase/database';

const RoomsContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = ref(database, 'rooms');

    onValue(roomListRef, snap => {
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });

    return () => {
      off(roomListRef);
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
