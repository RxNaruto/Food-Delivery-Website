import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);


app.listen(3000);