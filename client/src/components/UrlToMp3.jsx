import { useState } from 'react';

export default function UrlToMp3() {

    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [downloadStart, setDownloadStart] = useState('');
    const [loading, setLoading] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleConvert = async (e) => {
        e.preventDefault();
        setError('');
        setTitle('');
        setDownloadStart('');
        setLoading(true);

        try {

            const response = await fetch(`${backendUrl}/convert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.error) {
                setError(data.error);
            } else {
                setTitle(data.title);
            }
        }catch (err) {
            setError('Cannot connect to the server');
        }
    }

    const handleDownload = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${backendUrl}/save-song`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, title }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.error) {
                setError(data.error);
            } else {
                window.location.href = `${backendUrl}${data.downloadurl}`;
                setDownloadStart('Download completed...');
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

            {title && <p>Title: {title}</p>}

            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {!error && title && !downloadStart && !loading && (
                <button onClick={handleDownload}>
                    Download
                </button>
            )}

            {downloadStart && <p>{downloadStart}</p>}
        </div>
    );
}
