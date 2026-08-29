require("dotenv").config();

const express = require("express"); 
const cors = require("cors");  // agar frontedn and backedn diff ports pai hai to brwoser ka defualt behaviour stop kr degs or communicate kr payege backend and frontend
const helmet = require("helmet");  // ye header file add krta hai jon scriots vagera ko rok degi or bahut kuch security meausres
const rateLimit = require("express-rate-limit"); // paricular ip se jayada req ko rokega
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");

// getting the routes
const incidentRoutes = require("./src/routes/incidentroutes");
const sensorRoutes = require("./src/routes/sensorroutes");
const corridorRoutes = require("./src/routes/corridorroutes");
const villageRoutes = require("./src/routes/villageroutes");
const routeRoutes = require("./src/routes/routeroutes");


const app = express();
app.set("trust proxy", 1);
const server = http.createServer(app);

// Connect MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

// JSON body parser , 5mb tk ka json data hi lega ye 
app.use(express.json({ limit: "5mb" }));

// URL encoded data
app.use(express.urlencoded({ extended: true }));

// Basic rate limiter , 15 min mai 200 req ayyi to rok dega 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use("/api", limiter);
app.use("/api/incidents", incidentRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/corridors", corridorRoutes);
app.use("/api/villages", villageRoutes);
app.use("/api/routes", routeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Trishul backend is running "
  });
});






// Dynamic Health check of server and database
app.get("/api/health", (req, res) => {
  // 1 = Connected, 2 = Connecting, 0 = Disconnected, 3 = Disconnecting these are the numbers isdbcontted will return
  const isDbConnected = mongoose.connection.readyState === 1;

  res.status(isDbConnected ? 200 : 500).json({
    success: isDbConnected,
    server: "online",
    database: isDbConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
}); 

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(` Trishul server running on port ${PORT}`);
});