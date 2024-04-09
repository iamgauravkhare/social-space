const whitelist = [
  "http://localhost:5173",
  "https://hamza-social-space.netlify.app",
];

const corsOptions = {
  credentials: true,
  exposedHeaders: "Set-Cookie",
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Content-Type",
    "Authorization",
  ],
  optionSuccessStatus: 200,
  Headers: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  },
};

export default corsOptions;
