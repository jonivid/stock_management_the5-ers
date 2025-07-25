import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  hashedPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual("id").get(function (this: any) {
  return this._id.toHexString();
});

UserSchema.set("toJSON", { virtuals: true });
