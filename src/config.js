import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(
    String(process.env.MONGO),
    { useNewUrlParser: true },
  )
  .catch(err => console.log(err));

const brewerydbAPI = {
  sandbox: {
    url: String(process.env.BREWERYDB_SANDBOX_URL),
    token: String(process.env.BREWERYDB_SANDBOX_TOKEN),
  },
};

export default {
  brewerydbAPI: brewerydbAPI.sandbox,
};
