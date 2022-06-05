import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  const headers: string[] = req.args[0].rawHeaders;
  const bearerToken = headers.find((e) => e.startsWith('Bearer'));

  return bearerToken;
});
