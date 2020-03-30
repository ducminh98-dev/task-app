const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const Task = require('../models/task')

var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email invalid");
        }
      },
      trim: true,
      lowercase: true
    },

    name: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      maxlength: 24
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Pass word cannot contain password");
        }
      }
    },

    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error(" Age must be a postive number");
        }
      }
    },

    phone: {
      type: String,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("phone number invalid");
        }
      }
    },

    avatar: {
      type: String
    },

    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});


userSchema.pre('remove', async function(next) {
const user = this
await Task.deleteMany({owner: user._id})
next()

})
userSchema.methods.gererateAuthToken = async function() {
  const user = this;
  const token = jwtToken.sign(
    { _id: user._id.toString() },
    process.env.SECRET_TOKEN
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByEmailPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login ");

  const isHash = await bcrypt.compare(password, user.password);
  if (!isHash) throw new Error("Password uncorrect");
  return user;
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
