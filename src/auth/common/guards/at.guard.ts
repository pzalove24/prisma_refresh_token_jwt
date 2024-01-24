import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  //process metadata to determine whether to activate UseGuard

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // find the metadata
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      //check on handler which is on individual method in controller
      context.getHandler(),
      //check on class which may be applied on the whole controller level
      context.getClass(),
    ]);

    if (isPublic) return true;

    const result = (await super.canActivate(context)) as boolean

    return result
  }
}
