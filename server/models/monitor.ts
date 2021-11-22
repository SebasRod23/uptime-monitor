import mongoose, { Document, Schema } from 'mongoose';

export interface Record {
  date: Date;
  status: 'OKAY' | 'DOWN';
}

export interface iMonitor extends Document {
  userId: string;
  name: string;
  url: string;
  message: string;
  records: [Record];
}

const recordSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ['OKAY', 'DOWN'],
    default: 'OKAY',
  },
});

const monitorSchema = new Schema<iMonitor>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: 'Your site is down.',
    },
    records: {
      type: [recordSchema],
    },
  },
  { timestamps: true },
);

const Monitor = mongoose.model('Monitor', monitorSchema);

export default Monitor;
