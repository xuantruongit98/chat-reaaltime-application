import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const SidebarStyled = styled.div`
    font-size: 15px;
    height: 100vh;
    background-color: rgb(240, 240, 240) !important;
`;

export default function SideBar() {
  return (
      
      <SidebarStyled>
        <Row>
            <Col span={24}>
                <UserInfo />
            </Col>
            <Col span={24}>
                <RoomList />
            </Col>
        </Row>
      </SidebarStyled>
  )
}
