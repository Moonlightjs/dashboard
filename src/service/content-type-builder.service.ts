import { Nullable } from "@/types/common";
import HttpClient from "@/utils/HttpClient";

export type CollationTypeAttributeTypeCommon =
  | "string"
  | "email"
  | "text"
  | "password"
  | "richtext"
  | "integer"
  | "bigint"
  | "float"
  | "decimal"
  | "enumeration"
  | "date"
  | "datetime"
  | "time"
  | "boolean"
  | "json"
  | "uid";

export type CollationTypeAttributeTypeRelation = "relation";

export type CollationTypeAttributeTypeMedia = "media";

export type CollationTypeAttributeType =
  | CollationTypeAttributeTypeCommon
  | CollationTypeAttributeTypeRelation
  | CollationTypeAttributeTypeMedia;

export interface CollationTypeAttributeBase {
  type: CollationTypeAttributeType;
  required: boolean;
  unique: boolean;
  configurable: boolean;
  writable: boolean;
  visible: boolean;
  private: boolean;
}

export interface CollationTypeAttributeCommonBase
  extends CollationTypeAttributeBase {
  type: CollationTypeAttributeTypeCommon;
  default: any;
}

export interface CollationTypeAttributeString
  extends CollationTypeAttributeCommonBase {
  regex?: Nullable<string>;
  minLength: Nullable<number>;
  maxLength: Nullable<number>;
  default: Nullable<string>;
}

export interface CollationTypeAttributeNumber
  extends CollationTypeAttributeCommonBase {
  min?: Nullable<number>;
  max?: Nullable<number>;
  default: Nullable<number>;
}

export interface CollationTypeAttributeDecimal
  extends CollationTypeAttributeNumber {
  precision: number;
  scale: number;
}

export interface CollationTypeAttributeBoolean
  extends CollationTypeAttributeCommonBase {
  default: Nullable<boolean>;
}

export interface CollationTypeAttributeEnumeration
  extends CollationTypeAttributeCommonBase {
  enum: string[];
  default: Nullable<string>;
}

export interface CollationTypeAttributeDate
  extends CollationTypeAttributeCommonBase {
  default: Nullable<string>;
}

export type CollationTypeAttributeCommon =
  | CollationTypeAttributeString
  | CollationTypeAttributeNumber
  | CollationTypeAttributeDecimal
  | CollationTypeAttributeBoolean
  | CollationTypeAttributeEnumeration;

export type RelationType =
  | "oneToOne"
  | "manyToOne"
  | "oneToMany"
  | "manyToMany";

export interface CollationTypeAttributeRelationBase
  extends CollationTypeAttributeBase {
  type: CollationTypeAttributeTypeRelation;
  relation: RelationType;
  target: string;
  targetAttribute: string;
}

export interface CollationTypeAttributeRelationInverse
  extends CollationTypeAttributeRelationBase {
  inversedBy: string;
}

export interface CollationTypeAttributeRelationMapped
  extends CollationTypeAttributeRelationBase {
  mappedBy: string;
}

export type CollationTypeAttributeRelation =
  | CollationTypeAttributeRelationInverse
  | CollationTypeAttributeRelationMapped;

export enum AllowedTypeEnum {
  "images",
  "files",
  "videos",
  "audios",
}

export interface CollationTypeAttributeMediaBase
  extends CollationTypeAttributeBase {
  type: CollationTypeAttributeTypeMedia;
  multiple: boolean;
  allowedTypes: AllowedTypeEnum[];
}

export type CollationTypeAttribute =
  | CollationTypeAttributeCommon
  | CollationTypeAttributeRelation
  | CollationTypeAttributeMediaBase;

export interface ContentTypeBuilderInput {
  singularName: string;
  pluralName: string;
  displayName: string;
  description: string;
  draftAndPublish: boolean;
  softDelete: boolean;
  collectionName: string;
  attributes: Record<string, CollationTypeAttribute>;
}

export interface CollationTypeInfo {
  singularName: string;
  pluralName: string;
  displayName: string;
  description: string;
}

export interface CollationTypeOptions {
  draftAndPublish: boolean;
  softDelete: boolean;
}

export interface CollationType {
  uid: string;
  collectionName: string;
  info: CollationTypeInfo;
  options: CollationTypeOptions;
  attributes: Record<string, CollationTypeAttribute>;
}


class ContentTypeBuilderService {
  prefix = "content-type-builder";

  async getList() {
    const res = await HttpClient.get(this.prefix);
    return res.data.data;
  }

  async create(data: ContentTypeBuilderInput) {
    const res = await HttpClient.post(this.prefix + "/", data);
    return res.data.data;
  }

  async update(uid: string, data: ContentTypeBuilderInput) {
    const res = await HttpClient.put(this.prefix + "/" + uid, data);
    return res.data.data;
  }

  async delete(uid: string) {
    const res = await HttpClient.delete(this.prefix + "/" + uid);
    return res.data.data;
  }
}

export default new ContentTypeBuilderService();
