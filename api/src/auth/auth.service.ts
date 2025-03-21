import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

interface TokenPayload {
  email: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hashedPassword,
        } as Prisma.UserCreateInput,
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      return this.generateToken(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new UnauthorizedException('Ошибка при регистрации пользователя');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    const { password, ...result } = user;
    return this.generateToken(result);
  }

  private generateToken(user: Pick<User, 'id' | 'email' | 'name'>): { access_token: string } {
    const payload: TokenPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
