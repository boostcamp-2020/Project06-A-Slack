import React from 'react';
import { Header } from '@components/index';
import io from 'socket.io-client';

const domain = 'http://localhost:3000';

const App = () => {
  const socket1 = io(`${domain}/channel1`);
  const socket2 = io(`${domain}/channel2`);

  const handleSend1 = () => {
    console.log('ch1 clicked');
    socket1.emit('msg', 'value');
  };

  const handleSend2 = () => {
    console.log('ch2 clicked');
    socket2.emit('msg', 'value');
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
    </div>
  );
};

export default App;
