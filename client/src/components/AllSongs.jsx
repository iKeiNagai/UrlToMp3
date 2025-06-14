import React, { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import '../styles/allsongs.scss';

export default function AllSongs(){
    const[songs, setSongs] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [totalSongs, setTotalSongs] = useState(0);
    const [sortBy, setSortBy] = useState('downloadedAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/all-songs?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
            .then(response => response.json())
            .then(data => {
                setSongs(data.songs);
                setPageCount(data.totalPages);
                setTotalSongs(data.totalSongs);
            })
            .catch(error => {
                console.error('Error all-songs:', error);
            });
    }, [page,sortBy, sortOrder]);


    return (
        <div>
            <h1>Downloaded Songs</h1>
            
            <p>Total Songs: {totalSongs}</p>
            <div>
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="downloadedAt">Date</option>
                    <option value="duration">Duration</option>
                </select>

                <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    {sortOrder.toUpperCase()}
                </button>
            </div>
            <table> 
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Date</th>
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
            
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={(e) => setPage(e.selected + 1)}
                pageRangeDisplayed={3}
                pageCount={pageCount} 
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )

}