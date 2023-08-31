import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";
import { RouterUsers } from "./routes/users.js";
import { RouterValidaciones } from "./routes/validaciones.js";
import { RouterComprobadores } from "./routes/comprobadores.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", RouterUsers);
app.use("/api/validaciones", RouterValidaciones)
app.use("/api/comprobadores", RouterComprobadores)

app.get("/", (req, res) => {
  res.send("running");
});

app.listen(PORT);
