import { CustomerVisit } from "./customerVisits.model";

export interface Response {
  data: CustomerVisit[];
  fileName: string;
  length: number;
}
