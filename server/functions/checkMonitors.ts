import axios from 'axios';

import { SendEmail } from '../emailjs/SendEmail';
import Monitor, { Record } from '../models/monitor';
import User from '../models/user';

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

    const user = await User.findById(monitor.userId);

    if (user && record.status === 'DOWN') {
      await SendEmail({
        date: record.date.toLocaleString(),
        message: `${monitor.name} - ${monitor.url}`,
        to_name: user.username,
        to_email: user.email,
      });
    }

    monitor.updateOne({ $push: { records: record } }).then(
      (_) => console.log('New record added...'),
      (error) => console.log(error),
    );
  });
};

export default checkMonitors;
