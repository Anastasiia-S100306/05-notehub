import {ErrorMessage, Field, Form, Formik, type FormikHelpers} from "formik";
import css from "./NoteForm.module.css"
import * as Yup from "yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNote} from "../../services/noteService.ts";
import toast from "react-hot-toast";
import {useId} from "react";

interface NoteFormValues {
    title: string;
    content: string;
    tag: string;
}

const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "",
}

interface NoteFormProps {
    onClose: () => void;
}
const NoteFormScheme = Yup.object().shape({
    title: Yup.string()
        .min(3, "Note title must be at least 3 characters long")
        .max(50, "Note title must be 50 characters or less")
        .required("Title is required"),

    content: Yup.string()
        .max(500, "Content is too long").optional(),

    tag: Yup.string()
        .oneOf(
            ["Todo", "Work", "Personal", "Meeting", "Shopping"], "Please choose one option").required("Tag is required"),
})

export default function NoteForm({onClose}: NoteFormProps) {
    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: createNote,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notes"]});
            toast.success("New note created");
            onClose();
        },
         onError: () => {
            toast.error("Field to create note");
        }
    })

    const fieldId = useId();

    const handleSubmit = async (
        values: NoteFormValues,
        actions: FormikHelpers<NoteFormValues>,
    ) => {
        try {
            await mutation.mutateAsync(values);
            actions.resetForm();
        } finally {
            actions.setSubmitting(false);
        }
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={NoteFormScheme}>
{
                ({ isSubmitting }) => (
                    <Form className={css.form}>
                        <fieldset className={css.formGroup}>
                            <label htmlFor={`${fieldId} - title`}>Title</label>
                            <Field
                                id={`${fieldId} - title`}
                                type="text"
                                name="title"
                                className={css.input}
                            />
                            <ErrorMessage
                                name="title"
                                component="span"
                                className={css.error}/>
                        </fieldset>
 <fieldset className={css.formGroup}>
                            <label htmlFor={`${fieldId} - content`}>Content</label>
                            <Field
                                as="textarea"
                                id={`${fieldId} - content`}
                                name="content"
                                rows={8}
                                className={css.textarea}>
                            </Field>
                            <ErrorMessage
                                name="content"
                                component="span"
                                className={css.error}/>
                        </fieldset>

                        <fieldset className={css.formGroup}>
                            <label htmlFor={`${fieldId} - tag`}>Tag</label>
                            <Field
                                as="select"
                                name="tag"
                                id={`${fieldId} - tag`}
                                className={css.select}
                            >
                                <option value="Todo">Todo</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Shopping">Shopping</option>
                            </Field>
                 <ErrorMessage
                                name="tag"
                                component="span"
                                className={css.error}/>
                        </fieldset>

                        <fieldset className={css.actions}>
                            <button
                                type="button"
                                className={css.cancelButton}
                                onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={css.submitButton}
                                disabled={isSubmitting}>
                                Create note
                            </button>
                        </fieldset>
                    </Form>
                )}
            </Formik>
    )
}                