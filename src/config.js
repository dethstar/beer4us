import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(
    process.env.mongoose,
    { useNewUrlParser: true },
  )
  .catch(err => console.log(err));

const brewerydbAPI = {
  sandbox: {
    url: process.env.BREWERYDB_SANDBOX_URL,
    token: process.env.BREWERYDB_SANDBOX_TOKEN,
  },
};

export default {
  brewerydbAPI: brewerydbAPI.sandbox,
};
