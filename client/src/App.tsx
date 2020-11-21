import React from 'react';
import io from 'socket.io-client';
import { Header } from '@/components';
import axios from 'axios';

const domain = 'http://localhost:3000';

(async () => {
  const { data, status } = await axios.get(domain);
  console.log(status);
})();

const socket1 = io(`${domain}/channel1`, {
  transports: ['websocket', 'polling'],
});

socket1.on('connection', (data: any) => {
  console.log(`connect msg`, data);
});

socket1.on('msg', (data: any) => {
  console.log('every msg', data);
});

socket1.on('channel1', (data: any) => {
  console.log('from channel1', data);
});

socket1.on('channel1/room1', (data: any) => {
  console.log('data from room1', data);
});

const App = () => {
  const handleSend1 = () => {
    socket1.emit('msg', { msg: 'to channel1' });
  };

  const enterRoom1 = () => {
    socket1.emit('enter', 'channel1/room1');
  };

  const leaveRoom1 = () => {
    socket1.emit('leave', 'channel1/room1');
  };

  const sendMsgToChannel1Room1 = () => {
    socket1.emit('msg', { target: 'channel1/room1', msg: 'hi channel1/room1' });
  };

  const sendMsgToChannel1 = () => {
    socket1.emit('msg', { target: 'channel1', msg: 'hi channel1' });
  };

  return (
    <div>
      <button type="button" onClick={handleSend1}>
        채널 1 전송
      </button>
      <button type="button" onClick={enterRoom1}>
        Enter channel1/room1
      </button>
      <button type="button" onClick={leaveRoom1}>
        Leave channel1/room1
      </button>
      <button type="button" onClick={sendMsgToChannel1Room1}>
        Send msg to channel1/room1
      </button>
      <button type="button" onClick={sendMsgToChannel1}>
        Send msg to channel1
      </button>
      <Header />
    </div>
  );
};

export default App;
