import { useEffect, useState } from 'react';
import '../styles/urltomp3.scss';

export default function UrlToMp3({ setLoading, loading }) {

    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [downloadStart, setDownloadStart] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    //load from localStorage
    useEffect(() => {
        const savedUrl = localStorage.getItem('url');
        const savedTitle = localStorage.getItem('title');
        const savedError = localStorage.getItem('error');

        if (savedUrl) { setUrl(savedUrl); }
        if (savedTitle) { setTitle(savedTitle); }
        if (savedError) { setError(savedError); }
    }, []);

    //save to localStorage
    useEffect(() => {
        localStorage.setItem('url', url);
        localStorage.setItem('title', title);
        localStorage.setItem('error', error);
    }, [url, title, error]);

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

            if (data.error) {
                setError(data.error);
            } else {
                setTitle(data.title);
            }
        }catch (err) {
            setError('Cannot connect to the server');
        }finally {
            setLoading(false);
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

            if (data.error) {
                setError(data.error);
            } else {
                window.location.href = `${backendUrl}${data.downloadurl}`;
                setDownloadStart('Download completed...');
            }

        }catch (err) {
            setError('Cannot connect to the server');
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className='container'>
            <h1>Youtube Url To Mp3</h1>

            <form onSubmit={handleConvert} className='url-form'>
                <input
                    type="text"
                    placeholder="Enter YouTube URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <button type='submit' className='submit-button'>Convert</button>
            </form>

            <div className='box-result'>
                {title && <p>{title}</p>}

                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                

                {!error && title && !downloadStart && !loading && (
                    <button onClick={handleDownload}
                        className='download-button'>
                        Download
                    </button>
                )}

                {downloadStart && <p>{downloadStart}</p>}
                
            </div>
        </div>
    );
}
