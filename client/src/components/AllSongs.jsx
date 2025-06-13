import { useEffect, useState } from "react"

export default function AllSongs(){
    const[songs, setSongs] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/all-songs`)
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(error => {
                console.error('Error all-songs:', error);
            });
    }, []);


    return (
        <div>
             <h1>Downloaded Songs</h1>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>duration</th>
                        <th>downloadedAt</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map(song => (
                        <tr key={song._id}>
                            <td>{song.videoId}</td>
                            <td>{song.title}</td>
                            <td>{song.duration}</td>
                            <td>{song.downloadedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )

}