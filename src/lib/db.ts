import mongoose, { Mongoose } from "mongoose";
import env from "./env";

declare global {
  // 定义全局变量的类型
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// 初始化全局变量
global.mongoose = global.mongoose || {
  conn: null,
  promise: null,
};

export async function dbConnect(): Promise<Mongoose> {
  try {
    if (global.mongoose && global.mongoose.conn) {
      // console.log("Connected from previous");
      return global.mongoose.conn;
    } else {
      const conString = env.MONGO_URL;

      if (!conString) {
        throw new Error("MONGO_URL is not defined in environment variables");
      }

      const promise = mongoose.connect(conString, {
        autoIndex: true,
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };

      // console.log("Newly connected");
      return await promise;
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = (): void => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};
