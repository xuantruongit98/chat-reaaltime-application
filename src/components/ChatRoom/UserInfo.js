import { Avatar, Button, Typography } from 'antd'
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';
import { LogoutOutlined } from '@ant-design/icons';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgb(230,230,230);

    .username {
      font-weight: bold;
      margin-left: 5px;
    }
    .button-logout {
      //font-weight: bold;
      color: black;
      font-size: 15px;
      border: none;
    }
`;

export default function UserInfo() {
  // React.useEffect(() => {
  //   db.collection('rooms').onSnapshot((snapshot) => {
  //     const data = snapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }))

  //     console.log({ data, snapshot, docs: snapshot.docs })
  //   })
  // }, [])

  const { user: {
    displayName,
    photoURL
  } } = React.useContext(AuthContext);
  return (
    <WrapperStyled>
      <div>
          <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUperCase()}</Avatar>
          <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      <Button 
      className='button-logout'
        ghost 
        icon={<LogoutOutlined />} 
        onClick={() => auth.signOut()} >Log out
        </Button>
      </WrapperStyled>
  )
}
