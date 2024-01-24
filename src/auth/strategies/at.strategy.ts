import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

type JwtPayload = {
  sub: string;
  email: string;
};

export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret',
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
