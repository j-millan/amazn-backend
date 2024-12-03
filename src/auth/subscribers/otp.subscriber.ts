import { ConfigService } from '@nestjs/config';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { OTP } from '../entities';

@EventSubscriber()
export class OTPSubscriber implements EntitySubscriberInterface<OTP> {
  constructor(
    private _dataSource: DataSource,
    private _configService: ConfigService,
  ) {
    this._dataSource.subscribers.push(this);
  }

  listenTo() {
    return OTP;
  }

  async afterInsert(event: InsertEvent<OTP>): Promise<void> {
    const CREATED_AT = new Date(event.entity.createdAt);
    const EXPIRES_AT = new Date(
      CREATED_AT.getTime() + +this._configService.get('OTP_EXPIRES_IN'),
    );
    event.entity.expiresAt = EXPIRES_AT;
    await event.manager.save(event.entity);
  }
}
