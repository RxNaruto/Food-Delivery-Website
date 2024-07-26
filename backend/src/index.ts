import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import foodRouter from "./routes/food";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/food",foodRouter);

app.listen(3000);