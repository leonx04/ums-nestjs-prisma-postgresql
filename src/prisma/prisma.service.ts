import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Kết nối với cơ sở dữ liệu khi module khởi tạo.
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Ngắt kết nối khi module bị hủy.
  }
}
