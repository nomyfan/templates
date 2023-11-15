import { db } from "./database";
import type { NewPerson } from "./types";

export async function listPeople() {
  return await db.selectFrom("person").selectAll().execute();
}

export async function createPerson(person: NewPerson) {
  return await db
    .insertInto("person")
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deletePersonById(id: number) {
  return await db.deleteFrom("person").where("id", "=", id).execute();
}
