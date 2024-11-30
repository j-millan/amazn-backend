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

  async afterInsert(event: InsertEvent<OTP>): Promise<void> {
    const CREATED_AT = new Date(event.entity.createdAt);
    const EXPIRES_AT = new Date(CREATED_AT.getTime() + 120 * 1000); // 2 minutes

    event.entity.expiresAt = EXPIRES_AT;
    await event.manager.save(event.entity);
  }
}
