import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        console.log(request.session.userId);
        console.log('user decorator is activated');
        return request.currentUser;
    },
);
