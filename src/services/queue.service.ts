import { Service } from 'typedi';
// import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { ExecutionData } from '@/interfaces/execution.interface';
import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSW, REDIS_DB } from '@config';
// import { User } from '@interfaces/users.interface';
// import { ExecutionModel } from '@models/users.model';

@Service()
export class QueueService {
  public async enQueue(data: ExecutionData[]): Promise<ExecutionData[]> {
    const redisClient = new Redis(`redis//${REDIS_USER}:${REDIS_PASSW}@${REDIS_HOST}:${REDIS_PORT}/${REDIS_DB}`);

    // new Redis({
    //   port: REDIS_PORT,
    //   host: REDIS_HOST,
    //   username: REDIS_USER,
    //   password: REDIS_PASSW,
    //   db: 0,
    // });

    for (var item of data) {
      await redisClient.set(item.clientId, JSON.stringify(item), 'EX', 3600);
    }

    return data;
  }

  public async deQueue(clientId: string): Promise<ExecutionData> {
    const redisClient = new Redis(`redis//${REDIS_USER}:${REDIS_PASSW}@${REDIS_HOST}:${REDIS_PORT}/${REDIS_DB}`);
    return new Promise((res, err) => {
      res: {
        redisClient.get(clientId);
      }
    });
  }
}
