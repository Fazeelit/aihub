import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["registered", "active", "inactive"],
      default: "active",
    },

    profilePicture: {
      type: String,
      default: "default.jpg",
    },

    phone: {
      type: Number,
      default: null,
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    // ---------------- LOGIN ACTIVITY ----------------
    lastLogin: {
      type: Date,
      default: null,
    },

    loginIPs: {
      type: [String],
      default: [],
    },

    loginDevices: {
      type: [String],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
