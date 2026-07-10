import toast, {Toaster} from "react-hot-toast";
import {useDebouncedCallback} from "use-debounce";
import {useEffect, useState} from "react";

import css from './App.module.css'
import SearchBox from "../SearchBox/SearchBox.tsx";
import useFetchNotes from "../../queries/notes.ts";
import Pagination from "../Pagination/Pagination.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";
import Modal from "../Modal/Modal.tsx";
import Loader from "../Loader/Loader.tsx";
import NoteList from "../NoteList/NoteList.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

export default function App() {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const {
        data,
        error,
        isError,
        isSuccess,
        isLoading,
    } =
        useFetchNotes(
            search,
            page,
        );

    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 0;
 useEffect(() => {
        if (isSuccess && notes.length === 0) {
            toast.error("No notes found for your request");
            return;
        }
    }, [isSuccess, notes.length]);

    const handleSearch = useDebouncedCallback((searchQuery: string) => {
        setSearch(searchQuery);
        setPage(1);
    }, 1000);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <Toaster
                    position="top-center"/>
                <SearchBox onSearch={handleSearch}/>
                {totalPages > 1 &&
                    (<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />)}
                <button className={css.button} onClick={openModal}>
                    Create note +
                </button>
            </header>

            {isLoading && search.length > 0 && <Loader/>}
            {isError && <ErrorMessage errorMessage={`Something went wrong. Please try again. ${error.message}`}/>}
            {isSuccess && notes.length > 0 && (<NoteList notes={notes}/>)}

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal}></NoteForm>
                </Modal>
            )}
        </div>
    );
}