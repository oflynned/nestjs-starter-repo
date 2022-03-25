import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthRestController {
  @Get('/')
  getHealth(): Record<'health', string> {
    return { health: 'ok' };
  }
}
