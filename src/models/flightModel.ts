import mongoose, { Schema, Document, ObjectId } from "mongoose";
export interface IFlight extends Document {
  _id: mongoose.Types.ObjectId;
  date?: Date;
  status: string;
  iata: string;

  departure: {
    scheduled?: Date;
    airport: ObjectId;
  };
  arrival: {
    scheduled?: Date;
    airport: ObjectId;
  };
  airline: {
    name: string;
    iata: string;
  };
  price: number;
  duration: number; // Flight duration in minutes
}

interface IAirport extends Document {
  name: string;
  iata: string;
}

export const flightSchema = new Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, default: "scheduled" },
  iata: { type: String, required: true },
  departure: {
    airport: { type: Schema.Types.ObjectId, ref: "Airport", required: true },
    scheduled: { type: Date, required: false },
  },
  arrival: {
    airport: { type: Schema.Types.ObjectId, ref: "Airport", required: true },
    scheduled: { type: Date, required: false },
  },
  airline: {
    name: { type: String, required: true },
    iata: { type: String, required: true },
  },
  price: { type: Number, required: true, min: 0 },
  duration: { type: Number, required: true },
});

export const airportSchema = new Schema({
  name: { type: String, required: true },
  iata: { type: String, required: true, unique: true },
  // destination: [name, iata]
});

export const Airport = mongoose.model<IAirport>("Airport", airportSchema);

export const Flight = mongoose.model<IFlight>("Flight", flightSchema);
