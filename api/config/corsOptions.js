const whitelist = ["http://localhost:5173"];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  },
};

export default corsOptions;
