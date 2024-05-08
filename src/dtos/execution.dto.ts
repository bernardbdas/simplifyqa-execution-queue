import { IsString, IsNotEmpty } from 'class-validator';

export class CreateExecutionDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public clientId: string;

  @IsNotEmpty()
  public metadata: any;
}
