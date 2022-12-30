export type AttributeType = 'text' | 'string' | 'email' | 'rich_text' | 'password'
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
    isDraftAndPublish: boolean,
    isSoftDelete: boolean,
    attributes: Record<string, AttributeField>;
}