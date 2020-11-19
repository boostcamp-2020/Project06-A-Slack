import React, { useState, useEffect } from 'react';
import { Header } from '@components/index';
import io from 'socket.io-client';
import Hello from './Hello';
const domain = 'http://localhost:3000';

const App = () => {
  const socket1 = io(`${domain}/channel1`, {
    transports: ['websocket', 'polling'],
  });
  const socket2 = io(`${domain}/channel2`, {
    transports: ['websocket', 'polling'],
  });

  const socket3 = io(`${domain}/mainNamespace`, {
    transports: ['websocket', 'polling'],
  });

  const handleSend1 = () => {
    console.log('ch1 clicked');
    socket1.emit('msg', 'value');
  };

  const handleSend2 = () => {
    console.log('ch2 clicked');
    socket2.emit('msg', 'value');
  };

  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [who, setWho] = useState({
    room: '',
    name: '',
  });

  const onChange = (e: any) => {
    setComment(e.target.value);
  };

  const onCreate = (commentList: any) => {
    setCommentList([...commentList] as any);
    setComment('');
  };

  const createWho = (msg: any) => {
    setWho({ room: msg.room, name: msg.name });
  };

  useEffect(() => {
    const name = Math.floor(Math.random() * 1000);
    socket3.emit('joinRoom', { room: 'relax', name });
    socket3.on('joinRoom', (msg: any) => {
      createWho(msg);
    });
  }, []);

  const send = (commentList: any, comment: any) => {
    socket3.emit('chat message', { room: who.room, commentList, comment });
    socket3.on('chat message', (msg: any) => {
      console.log(msg);
      onCreate(msg);
    });
  };

  return (
    <div>
      <button type="button" onClick={handleSend1}>
        채널 1 전송
      </button>
      <button type="button" onClick={handleSend2}>
        채널 2 전송
      </button>
      <Header />
      <Hello
        comment={comment}
        commentList={commentList}
        who={who}
        onChange={onChange}
        onClick={send}
        createWho={createWho}
      />
    </div>
  );
};

export default App;
