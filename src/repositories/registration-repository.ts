import { IPaginationPayload, ISearchTerm } from '../types/common';
import { Collection, OptionalUnlessRequiredId } from 'mongodb';
import { IPost } from '../types/postsTypes';
import { bloggersCollection, postsCollection } from '../helpers/db';
import { IBlogger } from '../types/bloggersTypes';

class registrationRepository<T extends { id: number }> {
  constructor(private collection: Collection<T>) {}
}
