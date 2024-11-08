import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaMysqlService, PrismaPostgresService } from './../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prismaPostgresService: PrismaPostgresService,
    private prismaMysqlService: PrismaMysqlService,
  ) {}

  // Tạo mới một user
  async create(createUserDto: CreateUserDto) {
    // Mã hóa mật khẩu trước khi lưu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    return await this.prismaPostgresService.customers.create({
      data: {
        ...createUserDto,
        password: hashedPassword, // Sử dụng mật khẩu đã mã hóa
      },
    });
  }

  // Tìm tất cả user
  async findAll() {
    return await this.prismaPostgresService.customers.findMany();
  }

  // Tìm một user theo id
  async findOne(customer_id: number) {
    return await this.prismaPostgresService.customers.findUnique({ where: { customer_id } });
  }
  async findOneByUsername(email: string) {
    console.log("Email received for search:", email);  // Log để kiểm tra giá trị email

    if (!email) {
        throw new Error('Email không hợp lệ hoặc không được cung cấp.');
    }

    return await this.prismaPostgresService.customers.findUnique({
        where: { email },
    });
}

  // Cập nhật một user theo id
  async update(customer_id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaPostgresService.customers.update({
      where: { customer_id },
      data: updateUserDto,
    });
  }

  // Xóa một user theo id
  async remove(customer_id: number) {
    return await this.prismaPostgresService.customers.delete({ where: { customer_id } });
  }
     // Cập nhật refresh token của người dùng trong cơ sở dữ liệu (mã hóa trước khi lưu)
     async updateRefreshToken(userId: number, refreshToken: string) {
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10); // Mã hóa refresh token
      await this.prismaPostgresService.customers.update({
          where: { customer_id: userId },
          data: { refreshtoken: hashedRefreshToken }, // Lưu refresh token đã mã hóa
      });
  }
}
