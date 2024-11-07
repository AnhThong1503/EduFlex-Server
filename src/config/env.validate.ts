import { plainToClass } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';
import { validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsOptional()
  @IsNumberString({}, { message: 'PORT must be a valid number' })
  PORT?: string;
}

export function ValidateEnv(config: Record<string, unknown>) {
  config.PORT = config.PORT || '3000';

  const validatedConfig = plainToClass(EnvironmentVariables, config);
  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
}
