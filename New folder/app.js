import express from "express";
import cors from "cors";
import pkg from "body-parser";
import models from "./models/Index.js"; 
import vehicleRoutes from "./routes/vehicles.js";

const { json } = pkg;
const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(json());
app.use("/api", vehicleRoutes);

const PORT = process.env.PORT || 5000;


models.sequelize.sync().then(() => { 
  console.log("Database connected!");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});
