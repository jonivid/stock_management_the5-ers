import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { DatabaseModule } from "./modules/database/database.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { PortfolioModule } from "./modules/portfolio/portfolio.module";
import { FmpClientModule } from "./modules/fmp-client/fmp-client.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.development", ".env.local"],
      validationSchema: Joi.object({
        FMP_API_KEY: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().min(8).required(),
        BACKEND_PORT: Joi.number().default(3000),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PortfolioModule,
    FmpClientModule,
  ],
})
export class AppModule {}
