import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  currentMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, currentMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, currentMembers]);//, curMembers

//   React.useEffect(() => {
//     return () => {
//       // clear when unmount
//       setOptions([]);
//     };
//   }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, currentMembers) {
  return db
    .collection('users')
    .where('keywords','array-contains', search?.toLowerCase())
    .orderBy('displayName')
    .limit(20)
    .get()
    .then(snapshot => {
      return snapshot.docs
      .map(doc =>({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
      }))
      .filter(opt => !currentMembers.includes(opt.value));
    });
    } 

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    // update members in current room when user invite another user into
    const roomRef = db.collection('rooms').doc(selectedRoomId);

    roomRef.update({
      /* keep the previous members   */
       members: [...selectedRoom.members, ...value.map((val) => val.value)],
     });

    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title='Invite members'
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='search-user'
            label='Members names'
            value={value} // value is uid
            placeholder='Enter member name'
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            currentMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}