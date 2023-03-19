import { Ref } from "vue";

export function convertRefValueToRawData<T = any>(data: Ref<T>): T {
  return JSON.parse(JSON.stringify(data.value)) as T;
}
