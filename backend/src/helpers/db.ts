import mongoose from 'mongoose';

const connect = async (MONGO_URI: string) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Connected to mongodb'))
      .catch((err: Error) => console.log('Error connecting to mongodb:', err.stack));
  }
};

const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map(collection => mongoose.connection.collection(collection).deleteMany({}));

    await Promise.all(promises);
  }
};

const disconnect = async done => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    done();
  }
};

export default { connect, truncate, disconnect };
