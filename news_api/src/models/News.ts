import BaseModel from "./BaseModel";

export default interface News extends BaseModel {
  title: string;
  short_description: string;
  text: string;
  created_at: Date;
}
