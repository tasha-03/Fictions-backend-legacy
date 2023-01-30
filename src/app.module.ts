import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './common/roles.guard';
import { UserModule } from './users/users.module';
import { WorkModule } from './works/works.module';
import { FandomModule } from './fandoms/fandoms.module';
import { TagModule } from './tags/tags.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkModule,
    FandomModule,
    TagModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
