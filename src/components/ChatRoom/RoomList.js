import React from 'react';
import { Button, Collapse, Typography,Input, Form} from 'antd';
import styled from 'styled-components';
import { UsergroupAddOutlined , UserAddOutlined, DeleteFilled, EditFilled, CloseOutlined, SearchOutlined} from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';
import { useState } from 'react';
import '../../Search.css';
const { Panel } = Collapse;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  width: 66%;
  height: 35px;
  margin-top: 15px;
  margin-left: 15px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 10rem;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
  
  float: left;
`;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: black;
      font-size: 15px;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: black;
      font-size: 15px;
      margin-left: -39px;
    }
    .button-delete {
      float: right;
      margin-top: -10px;
      margin-right: 0px;
      color: gray;
    }
    .add-friend {
      color: black;
      font-size: 15px;
      margin-left: -39px;
    }
  }
`;

const ButtonStyled = styled(Button)`
    float: left;
    margin-top: 12px;
    margin-right: 5px;
    border: none;
    background-color: buttonface;
    border-radius: 15rem;
`;
const ButtonAddFriendStyled = styled(Button)`
    float: left;
    margin-top: 12px;
    margin-right: 5px;
    border: none;
    background-color: buttonface;
    border-radius: 15rem;
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 1px;
  color: white;
  font-size: 15px;
  width: 315px;
  height: 50px;
  margin-left: -39px;
  text-align: left;
  padding-top: 10px;
  padding-left: 39px;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId, setIsAddFriendVisible} = React.useContext(AppContext);
  //Search room chat
  const [ filteredData, setFilteredData ] = useState([]);
  const [ wordEntered, setWordEntered ] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = rooms.filter((room) => {
      return room.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if(searchWord == ""){
      setFilteredData([]);
    }else {
      setFilteredData(newFilter);
    }
  };
  
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <Collapse ghost defaultActiveKey={['1']}>
          <FormStyled>
            {
              filteredData.length === 0 ? (
                <Button
                    icon={<SearchOutlined/>}
                    type='text'
                    size='large'
                    >
                </Button>
              ) : (
                <Button
                  icon={<CloseOutlined />}
                  type='text'
                  size='large'
                  onClick={clearInput}
                  >
                </Button>
              )
            }
              <Input 
                type='text'
                placeholder='Search'
                value={wordEntered}
                onChange={handleFilter}
                bordered={false} 
                autoComplete="off" />
        </FormStyled>
        {
          filteredData.length != 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 10).map((room, key) => {
                return (
                  <a className="dataItem" key={key} onClick={() => setSelectedRoomId(room.id)}>
                    <p>{room.name}</p>
                  </a>
                );
              })}
            </div>
          )
        }
        <ButtonAddFriendStyled>
          <Button
                type="text"
                size='large'
                icon={<UserAddOutlined />} 
                className='add-friend' 
                onClick={() => setIsAddFriendVisible(true)}>
            </Button>
        </ButtonAddFriendStyled>
        <ButtonStyled >
          <Button
              type="text"
              size='large'
              icon={<UsergroupAddOutlined />} 
              className='add-room' 
              onClick={() => setIsAddRoomVisible(true)}>
            </Button>
        </ButtonStyled>
              <PanelStyled header ="List Rooms">
                {
                  rooms.length >= 10 
                }
                {rooms.map((room, index) => (
                  <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}
                  >
                    {room.name} 
                  </LinkStyled> 
                ))}
        </PanelStyled>
    </Collapse>
  );
}
