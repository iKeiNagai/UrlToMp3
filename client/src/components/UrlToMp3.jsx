import React, { useState } from 'react';

export default function UrlToMp3() {

    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleConvert = async (e) => {
        e.preventDefault();
        setError('');
        setTitle('');

        try {

            const response = await fetch('/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setTitle(data.title);
            }
        }catch (err) {
            setError('Cannot connect to the server');
        }
    }

    return (
        <div>
            <h1>Youtube Url To Mp3</h1>

            <form onSubmit={handleConvert}>
                <input
                    type="text"
                    placeholder="Enter YouTube URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <button type='submit'>Convert</button>
            </form>

            {error && <p>{error}</p>}

            {title && <p>Title: {title}</p>}
            {title && (
                <button>
                    Download
                </button>
            )} 

        </div>
    );
}
