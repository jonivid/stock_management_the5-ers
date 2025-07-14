import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FmpClientService } from "./fmp-client.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>(
          "FMP_BASE_URL",
          "https://financialmodelingprep.com/stable"
        ),
        params: {
          apikey: configService.get<string>("FMP_API_KEY"),
        },
        timeout: 5000,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [FmpClientService],
  exports: [FmpClientService],
})
export class FmpClientModule {}
