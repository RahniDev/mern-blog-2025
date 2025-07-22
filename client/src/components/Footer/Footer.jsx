import { useState } from 'react';
import './footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    return (
        <div id='footer'>
            <p>{`© ${year}. All Rights Reserved.`}</p>
            <div className="icons">
                <a href="/"><InstagramIcon /></a>
                <a href="/"><PinterestIcon /></a>
                 <a href="/"><XIcon /></a>
                 <a href="/"><FacebookIcon /></a>
            </div>
        </div>
    )
}

export default Footer