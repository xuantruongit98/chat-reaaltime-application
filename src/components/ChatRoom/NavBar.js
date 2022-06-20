import React from 'react'
import styled from 'styled-components';
import { Button } from 'antd';
import { MessageOutlined, ContactsOutlined, BellOutlined, CheckSquareOutlined, CloudOutlined, StarOutlined, SettingOutlined} from '@ant-design/icons';


const DropDownListContainer = styled("div")`
    height: 100vh;
    background-color: rgb(0, 145, 255) !important;

    button {
        border-color: none;
        color: white;
        align-items: flex-start;
        font-size: 30px !important;
    }
`;

export default function NavBar() {
  return (
      <DropDownListContainer>
          <div className='nav-bar'>
              <div className='nav-icon' >
                <Button style={{ height: 50, width: 60, marginTop: 56 }}
                    type='text'
                    size='large'
                    icon={<MessageOutlined />}
                    >  
                </Button>
              </div>
              <div className='nav-icon'>
                <Button style={{ height: 50, width: 60, marginTop: 10 }}
                    type='text'
                    size='large'
                    icon={<ContactsOutlined />}
                    >  
                </Button>
              </div>
              <div className='nav-icon'>
                <Button style={{ height: 50, width: 60, marginTop: 10}}
                    type='text'
                    size='large'
                    icon={<BellOutlined />}
                    >  
                </Button>
              </div>
              <div className='nav-icon'>
                <Button style={{ height: 50, width: 60, marginTop: 10 }}
                    type='text'
                    size='large'
                    icon={<CheckSquareOutlined />}
                    >  
                </Button>
              </div>
              <div className='nav-icon'>
                <Button style={{ height: 50, width: 60, marginTop: 10 }}
                    type='text'
                    size='large'
                    icon={<CloudOutlined />}
                    >  
                </Button>
              </div>
              <div className='nav-icon'>
                <Button style={{ height: 50, width: 60, marginTop: 10 }}
                    type='text'
                    size='large'
                    icon={<StarOutlined />}
                    >  
                </Button>
              </div>
              <div className='nav-icon'>
                <Button style={{ height: 50, width: 60, marginTop: 10 }}
                    type='text'
                    size='large'
                    icon={<SettingOutlined />}
                    >  
                </Button>
              </div>
          
        </div>
      </DropDownListContainer>
    
  )
}
