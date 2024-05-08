import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Container } from 'typedi';
import { CreateExecutionDto } from '@dtos/execution.dto';
import { ExecutionData } from '@interfaces/execution.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { UserService } from '@services/users.service';
import { QueueService } from '@/services/queue.service';

@Controller()
export class ExecutionController {
  public queue = Container.get(QueueService);

  @Post('/enqueue')
  @HttpCode(201)
  @UseBefore(ValidationMiddleware(CreateExecutionDto))
  @OpenAPI({ summary: 'Enqueue to job queue' })
  async enQueue(@Body() data: ExecutionData[]) {
    const createExecutionData: ExecutionData[] = await this.queue.enQueue(data);
    return { data: createExecutionData, message: 'Enqueue Success!' };
  }

  @Post('/dequeue')
  @HttpCode(201)
  @UseBefore(ValidationMiddleware(CreateExecutionDto))
  @OpenAPI({ summary: 'Dequeue to job queue' })
  async deQueue(@Body() clientId: string) {
    return await this.queue.deQueue(clientId);
  }
}
