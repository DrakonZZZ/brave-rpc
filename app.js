import express from 'express';
import Rpc from 'discord-rpc';

const app = express();
const PORT = 3000;

app.use(express.json());

const rpc = new Rpc.Client({ transport: 'ipc' });

const braveData = (data) => {
  const presence = {
    state: data.state,
    details: data.details,
    largeImageKey: 'bb',
    largeImageText: 'Drakonz Brave Browser',
    smallImageText: data.url,
    instance: true,
  };

  return presence;
};

rpc.on('ready', () => {
  app.post('/', (req, res) => {
    let data = req.body;
    if (data.action === 'active') {
      rpc.setActivity(braveData(data));
    } else if (data.action === 'unactive') {
      rpc.clearActivity();
    }
    res.sendStatus(20);
  });
});

app.listen(PORT, () => console.log(`Brave RPC is running on PORT: ${PORT}`));

rpc.login({ clientId: '612158030473068545' }).catch(console.error);
