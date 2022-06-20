import { Modal, Input, Form } from 'antd'
import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { user: { uid }, } = useContext(AuthContext);

    const [form] = Form.useForm();

    const handleOk = () => {
        //add new room to firestore
        console.log({formData: form.getFieldValue()});
        //add room to firestore attack a current user
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
        //reset form value

        form.resetFields();
        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    };

  return (
    <div>
      <Modal
        title='Create New Room'
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Room name' name='name'>
            <Input placeholder='Enter room name ' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input.TextArea placeholder='Enter description ' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
