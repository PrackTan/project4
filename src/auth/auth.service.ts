import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,

    ) {}

    async signTokens(userId: number, email: string): Promise<{ accessToken: string; refreshToken: string }> {
      const payload = { sub: userId, email }; // Payload của token bao gồm userId và email

      // Tạo access token với thời gian sống ngắn (5 phút)
      const accessToken = await this.jwtService.signAsync(payload, {
          expiresIn: '5m',
      });

      // Tạo refresh token với thời gian sống dài hơn (7 ngày)
      const refreshToken = await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
      });

      // Lưu refresh token vào cơ sở dữ liệu sau khi đã mã hóa
      await this.usersService.updateRefreshToken(userId, refreshToken);

      return { accessToken, refreshToken }; // Trả về cả access token và refresh token
  }

       // Xác minh và giải mã Access Token
    async validateAccessToken(token: string): Promise<any> {
      try {
          return await this.jwtService.verifyAsync(token); // Xác minh token và trả về payload nếu hợp lệ
      } catch (error) {
          throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
      }
  }
  // Xác minh và giải mã Refresh Token
  async validateRefreshToken(token: string): Promise<any> {
    try {
        return await this.jwtService.verifyAsync(token); // Xác minh refresh token
    } catch (error) {
        throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }
}
       //Xác thực người dùng với email và mật khẩu
       async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user; // Trả về người dùng nếu thông tin đăng nhập chính xác
        }
        return null; // Trả về null nếu thông tin đăng nhập không hợp lệ
    }
}
