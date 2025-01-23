import { DataSource, EventSubscriber, InsertEvent } from 'typeorm';
import { Category } from '../entities';
import slugify from 'slugify';

@EventSubscriber()
export class CategorySubscriber {
  constructor(private _datasource: DataSource) {
    this._datasource.subscribers.push(this);
  }

  listenTo() {
    return Category;
  }

  async afterInsert(event: InsertEvent<Category>): Promise<void> {
    const SLUG = slugify(event.entity.description, { lower: true });
    event.entity.slug = SLUG;
    await event.manager.save(event.entity);
  }
}
