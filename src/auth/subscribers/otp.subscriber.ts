import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { OTP } from '../entities';

@EventSubscriber()
export class OTPSubscriber implements EntitySubscriberInterface<OTP> {
  listenTo() {
    return OTP;
  }

  afterInsert(event: InsertEvent<OTP>): Promise<any> | void {
    const CREATED_AT = new Date(event.entity.createdAt);
    const EXPIRES_AT = new Date(CREATED_AT.getTime() + 30 * 1000); // 30 seconds

    event.entity.expiresAt = EXPIRES_AT;
    event.manager.save(event.entity);
  }
}
