import React, { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import '../styles/allsongs.scss';

export default function AllSongs(){
    const[songs, setSongs] = useState([]);
    const [totalSongs, setTotalSongs] = useState(0);

    //pagination
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);

    //sorting
    const [sortBy, setSortBy] = useState('downloadedAt');
    const [sortOrder, setSortOrder] = useState('desc');

    //filtering
    const [inputFilter, setInputFilter] = useState('');
    const [filter, setFilter] = useState('');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    //load songs from backend
    useEffect(() => {
        fetch(`${backendUrl}/all-songs?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${encodeURIComponent(filter)}`)
            .then(response => response.json())
            .then(data => {
                setSongs(data.songs);
                setPageCount(data.totalPages);
                setTotalSongs(data.totalSongs);
            })
            .catch(error => {
                console.error('Error all-songs:', error);
            });
    }, [page,sortBy, sortOrder, filter]);
    
    //delay call to server for filter input
    useEffect(() => {
        const debounce = setTimeout(() => {
            setPage(1);
            setFilter(inputFilter);
        }, 500);

        return () => clearTimeout(debounce);
    }, [inputFilter]);

    return (
        <div>
            <div className="all">
                <h1>Downloaded Songs</h1>
                
                <input
                    type="text"
                    placeholder="Filter by title"
                    value={inputFilter}
                    onChange={(e) => {
                        setInputFilter(e.target.value);
                    }}
                />

                <div className="top-bar">
                    <p>Total Songs: {totalSongs}</p> 
                    <div className="sort-section">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="downloadedAt">Date</option>
                            <option value="duration">Duration</option>
                        </select>

                        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                            {sortOrder.toUpperCase()}
                        </button>
                    </div>
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
            </div>

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
                forcePage={page - 1} //rerender active style when filtering
            />
        </div>
    )

}