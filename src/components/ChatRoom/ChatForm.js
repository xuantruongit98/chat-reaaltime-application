import React, { useContext, useState , useEffect} from 'react';
import styled from 'styled-components';
import { Button, Tooltip, Avatar, Form, Input, Upload } from 'antd';
import { SearchOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';
import useFirestore from '../../hooks/useFirestore';
import { PhoneOutlined, VideoCameraAddOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import firebase, { storage } from '../../firebase/config';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
      color: #0084FF;
      font-size: 20px;
    }
    &__description {
      font-size: 14px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
  .wellcome-header {
    text-align: center;
    margin-top: 10%;
  }
  .wellcome-subtitle {
    margin-left: 28%;
  }
  .wellcome-subtitle-2 {
    margin-left: 31%;
  }
  .each-slide > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    height: 350px;
  }
  
  .each-slide span {
    padding: 20px;
    font-size: 20px;
    background: #efefef;
    text-align: center;
  }
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
  .upload_image {
    margin-left: 150px;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const slideImages = [
  {
    
    url: 'https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png',
    caption: 'Slide 1'
  },
  {
    url: 'https://chat.zalo.me/assets/inapp-welcome-screen-03.3f97d49ceecb950d95382b3d8fd4f0f1.png',
    caption: 'Slide 2'
  },
  {
    url: 'https://chat.zalo.me/assets/inapp-welcome-screen-01.469ad7daf26e0303dd0d54eb5262e795.jpg',
    caption: 'Slide 3'
  },
  {
    url: 'https://chat.zalo.me/assets/inapp-welcome-screen-04.ade93b965a968b16f2203e9d63b283a7.jpg',
    caption: 'Slide 4'
  },
  {
    url: 'https://chat.zalo.me/assets/vanish_onboard.95edcd15d875cae4d6d504d739eaa977.png',
    caption: 'Slide 5'
  },
  {
    url: 'https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg',
    caption: 'Slide 6'
  },
];


export default function ChatForm() {

  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);

  const { user: {uid, photoURL, displayName}} = useContext(AuthContext);

  const [inputValue, setInputValue] = useState('');

  const [form] = Form.useForm ();

  const [imageUpload, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUploadChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const hanldeUploadImage = () => {
    if(imageUpload == null){
      return;
    } else {
        const uploadTask = storage.ref(`images/${imageUpload.name}`).put(imageUpload);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            //save image
            storage
              .ref("images")
              .child(imageUpload.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url);
                //save message
                addDocument('messages', {
                  text: url,
                  uid,
                  type: 'image',
                  photoURL,
                  roomId: selectedRoom.id,
                  displayName
                });
              });
          }
        );
      };
      setTimeout(
        () => form.resetFields(['upload'])({ position: 1 }), 
        5000
      );
  };
 //console.log("image: ", imageUpload);

  const handleInputChange = (e) =>{
    setInputValue(e.target.value)
  }

  const handleOnSubmit = () =>{
    if(inputValue == '') return;
    addDocument('messages', {
      text: inputValue,
      type: 'text',
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName
    });
    form.resetFields(['message']);
  };

//check roomId ? == current roomId

  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );
  const messages = useFirestore('messages', condition);

  return (
    <WrapperStyled>
      {
        selectedRoom.id ? (
        <>
          <HeaderStyled>
        <div className='header__info'>
          <p className='header__title'>{selectedRoom.name}</p>
          <span className='header__description'>
            {selectedRoom.description}
          </span>
        </div>
          <ButtonGroupStyled>
          <Button 
              type='text'
              size='large'
              icon={<SearchOutlined />}
              //onClick={() => setIsAddFriendVisible(true)}
            >  
            </Button>
          <Button 
              icon={<UsergroupAddOutlined />} 
              type='text'
              size='large'
              onClick={() => setIsInviteMemberVisible(true)}
              >
            </Button>
            <Button 
              type='text'
              size='large'
              icon={<PhoneOutlined />}
            >  
            </Button>
            <Button
             type='text'
             size='large'
              icon={<VideoCameraAddOutlined />}
            >  
            </Button>
            
            <Avatar.Group size='small' maxCount={2}>
              {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL 
                        ? '' : member.displayName?.charArt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))
              }
            </Avatar.Group>
          </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
              {messages.map((mes) => (
                <Message
                  key={mes.id}
                  text={ mes.text}
                  type = {mes.type}
                  photoURL={mes.photoURL}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt}
                />
              ))}
        </MessageListStyled>
        <FormStyled form={form}>
        <Form.Item name="upload">
            <Input
              type='file'
              onChange= {handleUploadChange}
              onPressEnter={hanldeUploadImage}
              name='file'
              display='none'
              accept='image/*'
              bordered={false} 
              autoComplete="off" />
              </Form.Item>
            <Button 
              type='primary'
              size='large'
              icon={<UploadOutlined />}
              onClick={hanldeUploadImage}>
            </Button>
          </FormStyled>

        <FormStyled form={form}>
          <Form.Item name="message"> 
            <Input
              onChange={handleInputChange}
              onPressEnter={handleOnSubmit}
              placeholder='Type a message here'
              bordered={false} 
              autoComplete="off" />
          </Form.Item>
          <Button 
            icon={<SendOutlined />}
            size='large'
            type='primary' 
            onClick={handleOnSubmit}>
          </Button>
        </FormStyled>
      </ContentStyled>
        </>
        ) : 
        <div>
            <h1
              className='wellcome-header'
            >Wellcome to Chat App
            </h1>
            <br></br>
            <span className='wellcome-subtitle'>Discover utilities that support working and chatting with </span><br></br>
            <span className='wellcome-subtitle-2'>family and friends optimized for your computer</span>
            <div className="slide-container">
              <Slide>
              {slideImages.map((slideImage, index)=> (
                  <div className="each-slide" key={index}>
                    <div style={{'backgroundImage': `url(${slideImage.url})`}}>
                      {/* <span>{slideImage.caption}</span> */}
                    </div>
                  </div>
                ))} 
              </Slide>
            </div>
        </div>
      }
    </WrapperStyled>
  );
}
