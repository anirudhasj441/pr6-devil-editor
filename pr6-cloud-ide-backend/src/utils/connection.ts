import mongoose from "mongoose";

/**
 * Connects to mongodb server
 *
 * @param uri
 * @returns
 */
const connectMongoDB = async (uri: string) => {
    console.log("mongo uri: ", uri);
    return mongoose.connect(uri);
};

export default connectMongoDB;
