import {IsEnum, IsOptional, IsPort} from 'class-validator';
import {NodeEnvironment} from '@shared/models/env/node-environment.model';

export class EnvironmentConfig {
  @IsOptional()
  @IsPort()
  PORT = `8080`;

  @IsOptional()
  @IsEnum(NodeEnvironment)
  NODE_ENV: NodeEnvironment = NodeEnvironment.DEV;
}
