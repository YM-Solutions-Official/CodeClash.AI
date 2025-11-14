import { ObjectId } from "mongodb";

export function validateMongoId(...ids: (string | ObjectId)[]): boolean {
  return ids.every((id) => ObjectId.isValid(id));
}
