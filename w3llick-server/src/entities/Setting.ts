import { ObjectType, Field } from "type-graphql";
import { BaseEntity } from "typeorm";

@ObjectType()
export class Setting extends BaseEntity {

  @Field({ nullable: true })
  tmdb_key: string;
}