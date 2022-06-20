import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }){
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [isAddFriendVisible, setIsAddFriendVisible] = useState(false);
    const [isSearchRoomVisible, setIsSearchRoomVisible] = useState(false);

    const {
        user: { uid },
      } = React.useContext(AuthContext);

// create condition for rooms
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore('rooms', roomsCondition);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );
  // create condition for members
  const usersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);
  const members = useFirestore('users', usersCondition);

  return (
    <AppContext.Provider 
    value={{ 
      rooms,
      members,
      selectedRoom,
      isAddRoomVisible,
      setIsAddRoomVisible,
      selectedRoomId,
      setSelectedRoomId,
      isInviteMemberVisible,
      setIsInviteMemberVisible,
      isAddFriendVisible,
      setIsAddFriendVisible,
      isSearchRoomVisible,
      setIsSearchRoomVisible,
        }}>
        {children}
    </AppContext.Provider>
  );
}
