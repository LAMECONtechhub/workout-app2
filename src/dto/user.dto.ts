import { baseEntity } from "./base-entity.dto";
export interface UserSummaryDto {
  userId: string;
  name: string;
  age: number;
  email: string;
  strengthTraining: string;
}
export interface UserSumaryDto {
  userId: string;
  name: string;
  age: number;
  email: string;
  strengthTraining: string;
}
export interface UserData extends UserSummaryDto {
  weight: number;
  height: number;
}
