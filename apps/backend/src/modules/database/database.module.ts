import { Module, Logger } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService, ConfigModule } from "@nestjs/config";

const logger = new Logger("DatabaseModule");

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>("MONGO_URI");
        if (!uri) {
          logger.error("MONGO_URI is not set in environment variables.");
          throw new Error("MONGO_URI is not set in environment variables.");
        }
        logger.log(`Attempting to connect to MongoDB with URI: ${uri}`);
        let connected = false;
        let retries = 5;
        let lastError = null;
        while (!connected && retries > 0) {
          try {
            await import("mongoose").then((mongoose) => mongoose.connect(uri));
            connected = true;
            logger.log("Successfully connected to MongoDB!");
          } catch (err) {
            lastError = err;
            logger.error(
              `MongoDB connection failed. Retries left: ${retries - 1}`
            );
            logger.error(err.message);
            await new Promise((res) => setTimeout(res, 2000));
            retries--;
          }
        }
        if (!connected) {
          logger.error("Could not connect to MongoDB after multiple attempts.");
          throw lastError;
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
