import React, { useEffect, useState } from 'react';
import * as callActions from '../../store/actions/calls';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Tag, Modal, Typography, Input } from 'antd';
import moment from 'moment';
import styles from './dashboard.module.css'

const { Text } = Typography;
const { TextArea } = Input;
const Dashboard = () => {
  const store = useSelector(state => state);
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(undefined);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedCall(undefined);
  };


  function TimeFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;
    var ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ' hours ' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ' minutes ' + (secs < 10 ? '0' : '');
    ret += '' + secs + ' seconds';
    return ret;
  }
  async function getCalls() {
    try {
      await dispatch(callActions.getCalls(limit, offset));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCalls();
  }, []);

  useEffect(() => {
    console.log(store);
    console.log(store.calls?.calls);
  }, [store]);

  const columns = [
    {
      title: 'CALL TYPE',
      dataIndex: 'call_type',
      key: 'id',
      render: call_type => (
        <Text
          type={
            call_type === 'answered'
              ? 'success'
              : call_type === 'missed'
              ? 'danger'
              : 'default'
          }>
          {call_type.charAt(0).toUpperCase() + call_type.slice(1)}
        </Text>
      ),
    },
    {
      title: 'DIRECTION',
      dataIndex: 'direction',
      key: 'id',
      render: direction => <p>{direction}</p>,
    },
    {
      title: 'DURATION',
      dataIndex: 'duration',
      key: 'id',
      render: duration => (
        <>
          <p>{TimeFormat(duration)}</p>
          <p>({duration} seconds)</p>
        </>
      ),
    },
    {
      title: 'FROM',
      dataIndex: 'from',
      key: 'id',
      render: from => <p>{from}</p>,
    },
    {
      title: 'TO',
      dataIndex: 'to',
      key: 'id',
      render: to => <p>{to}</p>,
    },
    {
      title: 'VIA',
      dataIndex: 'via',
      key: 'id',
      render: via => <p>{via}</p>,
    },
    {
      title: 'CREATED AT',
      dataIndex: 'created_at',
      key: 'id',
      render: created_at => <p>{moment(created_at).format('DD-MM-YYYY')}</p>,
    },
    {
      title: 'STATUS',
      dataIndex: 'is_archived',
      key: 'id',
      render: is_archived => (
        <p>
          {is_archived ? (
            <Tag color='green'>Archived</Tag>
          ) : (
            <Tag color='grey'>Unarchived</Tag>
          )}{' '}
        </p>
      ),
    },
    {
      title: 'ACTION',
      dataIndex: 'direction',
      key: 'id',
      render: direction => (
        <Button size='small' type='primary' onClick={showModal}>
          Add Note
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Turing Technologies Frontend Test</h2>
      <Table
        columns={columns}
        dataSource={store.calls?.calls}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setSelectedCall(record);
              showModal();
            },
          };
        }}
      />
      ;
      <Modal
        title='Add Notes'
        open={isModalOpen}
        onOk={handleOk}
        footer={[
          <Button key='submit' type='primary' onClick={handleOk} block>
            Save
          </Button>,
        ]}>
        <p>Call ID {selectedCall?.id}</p>
        <p>Call Type {selectedCall?.call_type}</p>
        <p>Duration {selectedCall?.duration}</p>
        <p>FROM {selectedCall?.from}</p>
        <p>TO {selectedCall?.to}</p>
        <p>VIA {selectedCall?.via}</p>
        <p>Notes</p>
        <TextArea rows={4} placeholder='Add Notes' />
      </Modal>
    </div>
  );
};

export default Dashboard;
