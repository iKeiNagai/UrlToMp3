import { Link } from 'react-router-dom';

export default function Navbar(){
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">ToMp3</Link>
                </li>
                <li>
                    <Link to="/all-songs">All Songs</Link>
                </li>
            </ul>
        </nav>
    )
}