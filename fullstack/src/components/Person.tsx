import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { trpc, queryClient } from "src/trpc";

import * as apiSchema from "@/shared/api-schema";

export function Person() {
  const {
    data: people,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      return await trpc.listPeople.query();
    },
    refetchOnWindowFocus: false,
  });

  const createPersonMutation = useMutation({
    mutationFn: async (username: string) => {
      const input = apiSchema.createPersonSchema.parse({
        username,
        display_name: username,
      });
      return await trpc.createPerson.mutate(input);
    },
  });

  const deletePersonMutation = useMutation({
    mutationFn: async (id: number) => {
      return await trpc.deletePerson.mutate(id);
    },
  });

  const [newUsername, setNewUsername] = useState<string>("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          disabled={createPersonMutation.isPending}
          onClick={() => {
            createPersonMutation.mutateAsync(newUsername).then(() => {
              setNewUsername("");

              return queryClient.invalidateQueries({
                queryKey: ["people"],
              });
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
      </section>

      {isFetching && <div>...</div>}

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
                  if (!deletePersonMutation.isPending) {
                    deletePersonMutation.mutateAsync(person.id).then(() =>
                      queryClient.invalidateQueries({
                        queryKey: ["people"],
                      }),
                    );
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
