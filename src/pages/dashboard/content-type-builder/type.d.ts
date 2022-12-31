export type AttributeType = 'text' | 'string' | 'email' | 'richtext' | 'password'
    | 'number' | 'integer' | 'bigint' | 'decimal' | 'float' | 'date' | 'datetime'
    | 'time' | 'boolean' | 'json' | 'enumeration' | 'relation';
export interface AttributeField {
    name: string;
    type: AttributeType;
    icon: string;
    [key: string]: any;
}
export interface CollectionType {
    displayName: string
    singular: string;
    plural: string;
    draftAndPublish: boolean,
    softDelete: boolean,
    attributes: Record<string, AttributeField>;
}