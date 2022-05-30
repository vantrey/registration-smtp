import { IPaginationPayload, ISearchTerm } from '../types/common';
import { Collection, OptionalUnlessRequiredId } from 'mongodb';
import { IPost } from '../types/postsTypes';
import { bloggersCollection, postsCollection } from '../helpers/db';
import { IBlogger } from '../types/bloggersTypes';

class Repository<T extends { id: number }> {
  constructor(private collection: Collection<T>) {}

  async findAll(payload: IPaginationPayload) {
    const { searchTerm, pageSize, pageNumber } = payload;

    let filter = {};
    if (searchTerm) {
      filter = { [searchTerm.fieldName]: { $regex: searchTerm.value } };
    }

    return this.collection
      .find(filter, { projection: { _id: 0 } })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize)
      .toArray();
  }

  async getAllCount(payload?: ISearchTerm) {
    let filter = {};
    if (payload) {
      const { fieldName, value } = payload;
      filter = { [fieldName]: { $regex: value } };
    }

    return this.collection.countDocuments(filter);
  }

  async createEntity<P extends OptionalUnlessRequiredId<T>>(newEntity: P) {
    const created = await this.collection.insertOne(newEntity, {
      forceServerObjectId: true,
    });

    if (created?.acknowledged) {
      return newEntity;
    } else {
      return null;
    }
  }

  async findById(id: number) {
    return this.collection.findOne<T>({ id }, { projection: { _id: 0 } });
  }
}

const a = new Repository(bloggersCollection);

a.createEntity({ id: 6, name: '', youtubeUrl: '' }).then((r) => {
  r?.name;
});
