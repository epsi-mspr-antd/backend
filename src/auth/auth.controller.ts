import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthDto,
  CreateAuthDto,
  authDtoExample,
  createAuthDtoExample,
} from './dto';
import { AccessTokenRO, TokensRO } from './types';
import { RtGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'User Signup',
    description: 'Creates a new user account.',
  })
  @ApiBody({
    type: CreateAuthDto,
    examples: {
      default: {
        summary: 'Default example',
        value: createAuthDtoExample,
      },
    },
  })
  signup(@Body() authDto: CreateAuthDto): Promise<TokensRO> {
    return this.authService.signup(authDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User Signin',
    description: 'Logs in a user and returns tokens.',
  })
  @ApiBody({
    type: AuthDto,
    examples: {
      default: {
        summary: 'Default example',
        value: authDtoExample,
      },
    },
  })
  signin(@Body() authDto: AuthDto): Promise<TokensRO> {
    return this.authService.signin(authDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User Logout',
    description: 'Logs out the current user.',
  })
  logout(@GetCurrentUserId() userId: number): Promise<void> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh Tokens',
    description: 'Refreshes the access token using the refresh token.',
  })
  @ApiBearerAuth()
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<AccessTokenRO> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
