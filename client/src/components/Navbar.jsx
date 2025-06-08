import { Link } from 'react-router-dom';

export default function Navbar({ loading }) {

    function handleClick(e) {
        if(loading){
            e.preventDefault();
        }
    }

    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">ToMp3</Link>
                </li>
                <li>
                    <Link to="/all-songs"
                        onClick={handleClick}
                    >All Songs</Link>
                </li>
            </ul>
        </nav>
    )
}