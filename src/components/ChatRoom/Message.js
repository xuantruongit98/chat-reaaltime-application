import {Image, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import React from 'react';
import { formatRelative } from 'date-fns';


const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .content {
    margin-left: 30px;
  }
`;

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}


export default function Message({text, type, displayName, createdAt, photoURL}) {
  return (
    <WrapperStyled>
        <div>
            <Avatar size="small" src={photoURL}>
              {photoURL ? '' : displayName.charArt(0)?.toUperCase()}
            </Avatar>
            <Typography.Text className='author'>{displayName}</Typography.Text>
            <Typography.Text className='date'>{formatDate(createdAt?.seconds)}</Typography.Text>
        </div>
        <div>
          {
            type =='image' ? (
              <Image
                styled={{marginLeft: 10}}
                width ={200}
                className='image'
                src={text} />
            ) : (
              <Typography.Text className='content'>{text}</Typography.Text>
            )
          }
        </div>
    </WrapperStyled>
  )
}
