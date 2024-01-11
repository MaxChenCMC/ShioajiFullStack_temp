import { useState } from 'react'

const defaultFormData = { title: "", body: "", };

export const FooormData = () => {
    const [formData, setFormData] = useState(defaultFormData);
    const { title, body } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        setFormData(defaultFormData);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor='title'>標題</label>
                <br />
                <input type='text' id='title' value={title} onChange={onChange} />
                <br />

                <label htmlFor='body'>Body</label>
                <br />
                <input type='text' id='body' value={body} onChange={onChange} />
                <br />

                <button type='submit'>發文</ button>
            </form>
        </>

    )
}
