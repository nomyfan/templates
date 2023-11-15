import type { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
  person: PersonTable;
}

// A string cannot be empty.
export type NoEmptyString = string;

export interface PersonTable {
  id: Generated<number>;
  username: NoEmptyString;
  display_name: NoEmptyString;
}

export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;
