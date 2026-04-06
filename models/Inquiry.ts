import mongoose, { Schema, Document, Model } from "mongoose";

export type InquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  country: string;
  level: "Diploma" | "Bachelors" | "Masters";
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    level: {
      type: String,
      required: true,
      enum: ["Diploma", "Bachelors", "Masters"],
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

// Prevent model re-compilation in development (hot reload)
const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
