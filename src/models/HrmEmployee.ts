import {Schema, model, Types} from "mongoose";
export interface IHrmEmployee {
  _id?: string;
  name: string;
  image?: Types.ObjectId;
  designation?: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
  status?: string;
  accountStatus?: string;
  password: string;
  customID?: string;
}
const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

// Create a Schema corresponding to the document interface.
const hrmEmployeeSchema = new Schema<IHrmEmployee>({
  name: {type: String, trim: true, required: true},
  image: { type: Schema.Types.ObjectId, trim: true, ref: "Media" },
  designation: { type: String, trim: true, },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please provide a valid email address"],
  },
  phone: {type: String, trim: true},
  address: { type: String, trim: true },
  role: {
    type: String,
    trim: true,
    default: 'User',
    enum: ['Super Admin', 'Admin', 'Manager', 'Sales Employee', 'Service Employee', 'User']
  },
  status: {
    type: String,
    trim: true,
    default: 'Offline',
    enum: ['Offline', 'Online']
  },
  accountStatus: {
    type: String,
    trim: true,
    default: 'Active',
    enum: ['Active', 'Deactivate']
  },
  password: {type: String, trim: true, required: true},
  customID: {type: String, trim: true}
}, {timestamps: true});

hrmEmployeeSchema.pre('save', function (next) {
  const date = new Date();
  const random = Math.floor((Math.random() * 10000) + 1);
  this.customID = `TST${date.getDay()}${date.getMonth()}${date.getFullYear()}${random}`;
  next();
})
// Create a Model.
export default model<IHrmEmployee>('HrmEmployee', hrmEmployeeSchema);


