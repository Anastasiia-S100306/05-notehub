import {fetchNotes, type NoteServiceResponse} from "../services/noteService.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

export default function useFetchNotes(search: string, page: number) {
    return useQuery<NoteServiceResponse>({
        queryKey: ["notes", search, page],
        queryFn: () => fetchNotes({search, page}),
        placeholderData: keepPreviousData,
    });
}