import mongoose, { Schema, Types, Document, Model } from "mongoose";

// Citation interface
interface ICitation {
  id: string;
  file: string;
  pageNumber: number;
  text: string;
  url?: string;
}

// Chat message interface
interface IChatMessage {
  role: string;
  content: string;
  feedback?: {
    like?: boolean;
    dislike?: {
      value?: boolean;
      reason?:
        | "Not helpful"
        | "Inaccurate"
        | "Other"
        | "Wrong Citation"
        | "unspecified"
        | null;
      explanation?: string | null;
    };
  };
  citations?: ICitation[];
}

// ChatMessages document interface
export interface IChatMessages extends Document {
  _id: Types.ObjectId;
  stateId?: Types.ObjectId;
  assistantType: "openai" | "langchain";
  programId: Types.ObjectId;
  userId: Types.ObjectId;
  title?: string;
  chatMessages: IChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Citation schema
const CitationSchema = new Schema<ICitation>({
  id: { type: String, required: true },
  file: { type: String, required: true },
  pageNumber: { type: Number, required: true },
  text: { type: String, required: true },
  url: { type: String, required: false },
});

// Chat message schema
const chatMessagesSchema = new Schema<IChatMessage>(
  {
    role: { type: String, required: true },
    content: { type: String, required: true },
    feedback: {
      like: { type: Boolean, default: false },
      dislike: {
        value: { type: Boolean, default: false },
        reason: {
          type: String,
          enum: [
            "Not helpful",
            "Inaccurate",
            "Other",
            "Wrong Citation",
            "unspecified",
          ],
          default: null,
        },
        explanation: { type: String, maxlength: 200, default: null },
      },
    },
    citations: { type: [CitationSchema], required: false },
  },
  { _id: false }
);

// ChatMessages schema
const ChatMessageSchema = new Schema<IChatMessages>(
  {
    stateId: { type: Schema.Types.ObjectId, ref: "State" },
    assistantType: {
      type: String,
      enum: ["openai", "langchain"],
      required: true,
    },
    programId: { type: Schema.Types.ObjectId, ref: "Program", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: false },
    chatMessages: [chatMessagesSchema],
  },
  { timestamps: true, versionKey: false }
);

// Export typed model
export const ChatMessages: Model<IChatMessages> =
  mongoose.models.ChatMessages ||
  mongoose.model<IChatMessages>("ChatMessages", ChatMessageSchema);
