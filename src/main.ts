import express from "express";
import { RouterPost } from "./routes/RoutePost";
import { RouterUser } from "./routes/RouteUser";

const app = express();

app.use(express.json());

app.use(RouterPost);
app.use(RouterUser);

app.listen(4000, () => console.log("Server running"));
