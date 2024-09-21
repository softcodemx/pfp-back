import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvsService {
  get(key: string): string {
    return process.env[key];
  }

  getAll() {
    return process.env
  }
}
