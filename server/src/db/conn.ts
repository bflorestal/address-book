import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("MongoDB à l'écoute");
  } catch (err) {
    if (err instanceof mongoose.Error || err instanceof Error) {
      console.error(err.message);
    }
    process.exit(1);
  }
};

export { connectDB };
