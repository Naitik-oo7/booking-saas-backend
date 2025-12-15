import { Model, Optional } from "sequelize";

export interface BaseAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface BaseCreationAttributes
  extends Optional<BaseAttributes, "id"> {}

export class BaseModel<
  T extends BaseAttributes,
  C extends BaseCreationAttributes
> extends Model<T, C> {
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
