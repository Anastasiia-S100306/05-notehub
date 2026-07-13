import { fetchNotes, type FetchNotesResponse } from "../services/noteService.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useFetchNotes(search: string, page: number) {
  return useQuery<FetchNotesResponse>({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes({ search, page, perPage: 6 }),
    placeholderData: keepPreviousData,
  });
}