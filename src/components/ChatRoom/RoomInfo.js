import React, { useState, useContext } from 'react';
import { Row, Col, Button, message } from 'antd';
import styled from 'styled-components';
import { UserOutlined, SettingOutlined,LinkOutlined, FileWordOutlined, FileExcelOutlined,
   EyeInvisibleOutlined,RightSquareOutlined,LoadingOutlined, DeleteOutlined} from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';
import useFirestore from '../../hooks/useFirestore';
import { Image } from 'antd';
import Message from './Message';

const DropDownContainer = styled("div")`
  margin-left: 10px;
  margin-top: 30px;
`;
const DropDownHeader = styled("div")`
  font-weight: bold;
  margin-left: 30px;
  .ant-collapse-content-box {
    padding: 0 40px;
  }
`;
const DropDownListContainer = styled("div")``;
const DropDownList = styled("ul")``;
const ListItem = styled("li")``;


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
      color: #0084FF;
      margin: 0;
      margin-left: 80px;
      font-weight: bold;
      font-size: 20px;
      float: right;
    }
    &__description {
      font-size: 14px;
    }
  }
`;

const SidebarStyled = styled.div`
    font-size: 15px;
    height: 100vh;
    background-color: rgb(240, 240, 240) !important;
`;

export default function InforRoom({text, type, displayName, createdAt, photoURL}) {

  const { selectedRoom, members } = useContext(AppContext);

  //Group member
  const [isOpenGroupMember, setIsOpenGroupMember] = useState(false);
  const groupMember = () => setIsOpenGroupMember(!isOpenGroupMember);
  //Group message board
  const [isOpenGroupMemberBoard, setisOpenGroupMemberBoard] = useState(false);
  const groupMessageBoard = () => setisOpenGroupMemberBoard(!isOpenGroupMemberBoard);
  //PhotosVideos
  const [isOpenGroupPhotosVideos, setisOpenGroupPhotosVideos] = useState(false);
  const groupPhotosVideos = () => setisOpenGroupPhotosVideos(!isOpenGroupPhotosVideos);
  //Files
  const [isOpenFiles, setisOpenGroupFiles] = useState(false);
  const groupFiles = () => setisOpenGroupFiles(!isOpenFiles);
  //Links
  const [isOpenLinks, setisOpenGroupLinks] = useState(false);
  const groupLinks = () => setisOpenGroupLinks(!isOpenLinks);
  //Security Settings
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const groupSercuritySetting = () => setIsOpenSetting(!isOpenSetting);

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
      <SidebarStyled>
        <Row>
            <Col span={24}>
              <HeaderStyled>
                  <div className='header__info'>
                      <p className='header__title'>Room Infomation</p>
                      <span className='header__description'>
                      </span>
                  </div>
              </HeaderStyled>
            {
              selectedRoom.id ? (
                <>
                <div className='dropdown'>
                  <DropDownContainer>
                    <DropDownHeader
                      onClick={groupMember}>Group member</DropDownHeader>
                    {isOpenGroupMember && (
                    <DropDownListContainer>
                      <DropDownList>
                          <Button 
                          icon={<UserOutlined />}
                          type='text'
                          size='large'
                          >
                            {members.length} Members
                          </Button>
                          <Button
                          icon={<SettingOutlined />}
                          type='text'
                          size='large'
                          > 
                            Manage, permission settings
                          </Button>
                      </DropDownList>
                    </DropDownListContainer>
                    )}
                  </DropDownContainer>

                  {/* <DropDownContainer>
                    <DropDownHeader onClick={groupMessageBoard}>Group message board</DropDownHeader>
                    {isOpenGroupMemberBoard && (
                    <DropDownListContainer>
                      <DropDownList>
                      <Button 
                          icon={<ClockCircleOutlined />}
                          type='text'
                          size='large'
                          >
                            Appointment reminder list
                          </Button>
                        
                          <Button
                          icon={<PushpinOutlined />}
                          type='text'
                          size='large'
                          > 
                            Note, Pin, Vote
                          </Button>
                      </DropDownList>
                    </DropDownListContainer>
                    )}
                  </DropDownContainer> */}

                  <DropDownContainer>
                    <DropDownHeader onClick={groupPhotosVideos}>Photos/Videos</DropDownHeader>
                    {isOpenGroupPhotosVideos && (
                    <DropDownListContainer>
                      {
                        messages.filter(message => message.type == 'image').slice(0, 4).map(filteredImage => (
                          <Image
                            style={{marginRight: 10, padding: 5}}
                            width={70}
                            height={70}
                            src={filteredImage.text} />
                          ) 
                        )
                      }
                    </DropDownListContainer>
                    )}
                  </DropDownContainer>

                  <DropDownContainer>
                    <DropDownHeader onClick={groupFiles}>Files</DropDownHeader>
                    {isOpenFiles && (
                    <DropDownListContainer>
                      <DropDownList>
                      <Button
                          icon={<FileWordOutlined />}
                          type='text'
                          size='large'
                          > 
                            
                          </Button>
                          reactJs-community.docs
                          <br></br>
                          <Button
                          icon={<FileExcelOutlined />}
                          type='text'
                          size='large'
                          > 
                            
                          </Button>
                          reactJs-community.exls
                      </DropDownList>
                    </DropDownListContainer>
                    )}
                  </DropDownContainer>

                  <DropDownContainer>
                    <DropDownHeader onClick={groupLinks}>Links</DropDownHeader>
                    {isOpenLinks && (
                    <DropDownListContainer>
                      <DropDownList>
                      <Button
                          icon={<LinkOutlined />}
                          type='text'
                          size='large'
                          > 
                            
                          </Button>
                          https://facebook.com/truongtu
                          <br></br>
                          <Button
                          icon={<LinkOutlined />}
                          type='text'
                          size='large'
                          > 
                            
                          </Button>
                          https://google.com/reactjs
                      </DropDownList>
                    </DropDownListContainer>
                    )}
                  </DropDownContainer>
                  <DropDownContainer>
                    <DropDownHeader onClick={groupSercuritySetting}>Security settings</DropDownHeader>
                    {isOpenSetting && (
                    <DropDownListContainer>
                      <DropDownList>
                          <Button
                          icon={<EyeInvisibleOutlined />}
                          type='text'
                          size='large'
                          > 
                          </Button>
                          Hiden chat
                          <br></br>
                          {/* <Button
                          icon={<WarningOutlined />}
                          type='text'
                          size='large'
                          > 
                          </Button>
                          Report
                          <br></br> */}
                          <Button
                          icon={<DeleteOutlined />}
                          type='text'
                          size='large'
                          > 
                          </Button>
                          Delete chat history
                          <br></br>
                          <Button
                          icon={<RightSquareOutlined />}
                          type='text'
                          size='large'
                          > 
                          </Button>
                          Leave the group
                          
                      </DropDownList>
                    </DropDownListContainer>
                    )}
                  </DropDownContainer>
                </div>
                </>
                ) : 
                  <Button
                      icon={<LoadingOutlined />}
                      size='large'
                      type='text'
                      style={{margin: 10}}
                    > 
                  </Button>
            }
            </Col>
        </Row>
      </SidebarStyled>
  )
}