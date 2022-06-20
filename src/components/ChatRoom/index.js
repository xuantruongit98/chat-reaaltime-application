import React from 'react';
import { Row, Col } from 'antd';
import NavBar from './NavBar';
import SideBar from './SideBar';
import ChatForm from './ChatForm';
import RoomInfo from './RoomInfo';

export default function ChatRoom() {
  return (
    <Row>
      <Col span={1}><NavBar /> </Col>
      <Col span={5}><SideBar /> </Col>
      <Col span={13}><ChatForm /> </Col>
      <Col span={5}><RoomInfo /></Col>
    </Row>
  )
};
