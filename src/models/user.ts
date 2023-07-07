import mongoose from "mongoose";
import { Password } from "../services/password";
import { UnprocessableEntityError } from "../errors/unprocessable-entity-error";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashed = await Password.toHash(this.get("password"));
      this.set("password", hashed);
    }
  } catch (error) {
    next(new UnprocessableEntityError());
  }
  next();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
