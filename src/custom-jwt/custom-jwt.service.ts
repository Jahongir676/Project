import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService {
  private readonly accessTokenSecret = process.env.JWT_ACCESS_KEY;
  private readonly refreshTokenSecret = process.env.JWT_REFRESH_KEY;
  private readonly tokenExpiry = process.env.JWT_ACCESS_TIME;
  private readonly refreshTokenExpiry = process.env.JWT_REFRESH_TIME;
  private readonly url = process.env.HOST;
  private readonly expire = process.env.ACTIVE_LINK_TIME;

  constructor(private readonly jwtService: JwtService) {}

  // Generate Access and Refresh Tokens
  generateTokens(payload: any) {
    try {
      const accessToken = this.jwtService.sign(payload, {
        secret: this.accessTokenSecret,
        expiresIn: this.tokenExpiry,
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpiry,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      console.error('Token generation error:', error);
      throw new BadRequestException('Failed to generate tokens');
    }
  }

  // Generate an active link (email confirmation or password reset)
  generateActiveLink(payload: any, tokenType: 'confirm' | 'reset') {
    try {
      const secret =
        tokenType === 'confirm'
          ? this.accessTokenSecret
          : this.refreshTokenSecret;

      const token = this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: this.expire,
      });

      return `${this.url}?token=${token}`;
    } catch (error) {
      console.error('Active link generation error:', error);
      throw new BadRequestException('Failed to generate active link');
    }
  }

  // Verify Tokens (both access and refresh tokens)
  verifyToken(token: string, isRefreshToken = false): any {
    try {
      const secret = isRefreshToken
        ? this.refreshTokenSecret
        : this.accessTokenSecret;

      return this.jwtService.verify(token, { secret });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else {
        console.error('Token verification error:', error);
        throw new BadRequestException('Failed to verify token');
      }
    }
  }

  // Verify Email Token (email confirmation)
  verifyEmailToken(token: string): any {
    try {
      return this.verifyToken(token);
    } catch (error) {
      console.error('Email token verification error:', error);
      throw new UnauthorizedException(
        'Invalid or expired email confirmation token',
      );
    }
  }

  // Verify Reset Token (password reset)
  verifyResetToken(token: string): any {
    try {
      return this.verifyToken(token, true);
    } catch (error) {
      console.error('Password reset token verification error:', error);
      throw new UnauthorizedException(
        'Invalid or expired password reset token',
      );
    }
  }
}
