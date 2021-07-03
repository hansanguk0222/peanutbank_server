import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connect, disconnect } from "@/src/db";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == "production" ? ".env" : ".env.dev"
  ),
});

const app = express();

connect();
