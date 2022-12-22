import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.interface';

@Injectable()
export class CacheInMemoryService implements CacheService { }