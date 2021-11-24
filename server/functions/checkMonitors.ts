import axios from 'axios';

import Monitor, { Record } from '../models/monitor';

const checkMonitors = async () => {
  console.log('Checking all monitors...');

  const monitors = await Monitor.find();

  monitors.forEach(async (monitor) => {
    const record: Record = { date: new Date(), status: 'OKAY' };

    await axios(monitor.url, {
      method: 'GET',
      responseType: 'json',
    }).then(
      (res) => {
        if (res.status !== 200) {
          record.status = 'DOWN';
        }
      },
      (error) => {
        record.status = 'DOWN';
      },
    );

    monitor.updateOne({ $push: { records: record } }).then(
      (_) => console.log('New record added...'),
      (error) => console.log(error),
    );
  });
};

export default checkMonitors;
