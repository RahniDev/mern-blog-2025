import { useState } from 'react';
import './footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    return (
        <div id='footer'>
            <p>{`© ${year}. All Rights Reserved.`}</p>
            <div className="icons">
                <InstagramIcon />
                <XIcon />
                <PinterestIcon />
            </div>
        </div>
    )
}

export default Footer