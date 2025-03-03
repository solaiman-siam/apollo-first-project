import { FilterQuery, model, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    let searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: ['name.firstName', 'presentAddress', 'email'].map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const mutateQuery = { ...this.query };

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete mutateQuery[el]);

    this.modelQuery = this.modelQuery.find(mutateQuery as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort = (this?.query?.sort as string)?.split(',').join(' ') || '-createdAt'

    this.modelQuery = this.modelQuery.sort(sort as string)

    return this

  }

  paginate() {
    const limit = Number(this?.query?.limit) || 10
    const page = Number(this?.query?.page) || 1
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields = (this?.query?.fields as string)?.split(',').join(' ') || '__v'

    this.modelQuery = this.modelQuery.select(fields)

    return this
  }
}


export default QueryBuilder