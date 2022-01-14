import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

const connectToDatabase = async () => {
  const db = await mongoose.connect(
    process.env.NEXT_PUBLIC_MONGO_URI as string
  );

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};

export default connectToDatabase;
