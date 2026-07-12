import axios, {type AxiosInstance} from "axios";
import type {CreateNotesProps, Note} from "../types/note.ts";

const PER_PAGE = 10;

export interface NoteServiceResponse {
    notes: Note[];
    totalPages: number;
}

export interface FetchNotesProps {
    search: string;
    page: number;
}

const api: AxiosInstance = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
       Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN || ""}`,
    }
})

export const fetchNotes = async ({search, page}: FetchNotesProps): Promise<NoteServiceResponse> => {
    const { data } = await api.get<NoteServiceResponse>("/notes", {
        params: {
            search,
            page,
            perPage: PER_PAGE,
        }
    });
    return data;
}

export const createNote = async (noteData: CreateNotesProps): Promise<Note> => {
    const { data } = await api.post<Note>("/notes", noteData);
    return data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data;
}