import { useState } from "react";
import { trpc } from "src/trpc";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import * as apiSchema from "@/shared/api-schema";

export function Person() {
  const {
    data: people,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    ["people"],
    async () => {
      return await trpc.listPeople.query();
    },
    { revalidateOnFocus: false },
  );

  const createPersonMutation = useSWRMutation(
    "createPerson",
    async (_, { arg: username }: { arg: string }) => {
      const input = apiSchema.createPersonSchema.parse({
        username,
        display_name: username,
      });
      return await trpc.createPerson.mutate(input);
    },
  );

  const deletePersonMutation = useSWRMutation(
    "deletePerson",
    async (_, { arg: id }: { arg: number }) => {
      return await trpc.deletePerson.mutate(id);
    },
  );

  const [newUsername, setNewUsername] = useState<string>("");

  return (
    <div className="p-2">
      <section>
        <input
          className="border rounded"
          value={newUsername}
          onChange={(evt) => setNewUsername(evt.target.value)}
        />
        <button
          className="ml-2 bg-gray-300 px-1.5 rounded"
          disabled={createPersonMutation.isMutating}
          onClick={() => {
            createPersonMutation.trigger(newUsername).then(() => {
              setNewUsername("");

              return mutate();
            });
          }}
        >
          Add
        </button>

        <button
          className="ml-2 bg-gray-300 px-1.5 rounded"
          onClick={() => {
            trpc.error.query(1).catch((err) => {
              console.dir(err);
            });
          }}
        >
          Error
        </button>

        <span className="ml-2">
          {createPersonMutation.isMutating && <span>Creating...</span>}
          {deletePersonMutation.isMutating && <span>Deleting...</span>}
        </span>
      </section>

      {isLoading && <div>Loading...</div>}
      {isValidating && !isLoading && <div>Revalidating...</div>}

      {people?.length === 0 && <div>Empty</div>}

      <ul className="list-disc pl-4">
        {people?.map((person) => {
          return (
            <li key={person.id} className="">
              {person.display_name}
              <i
                className="not-italic cursor-pointer text-red-500 ml-2"
                title={`Delete ${person.display_name}`}
                onClick={(evt) => {
                  evt.preventDefault();
                  if (!deletePersonMutation.isMutating) {
                    deletePersonMutation
                      .trigger(person.id)
                      .then(() => mutate());
                  }
                }}
              >
                ×
              </i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
