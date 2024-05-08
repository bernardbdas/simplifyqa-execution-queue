import { App } from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { UserController } from '@controllers/users.controller';
// import {*} from '@controllers/queue.controller'
import { ValidateEnv } from '@utils/validateEnv';
import { ExecutionController } from './controllers/queue.controller';

ValidateEnv();

const app = new App([AuthController, UserController, ExecutionController]);
app.listen();
