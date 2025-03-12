import { KeySite, LungFeature } from "./enums";

export interface Image {
  imageId: string;
  date: Date; 
  uri: string;
  keySite?: KeySite;
  label?: LungFeature;
}