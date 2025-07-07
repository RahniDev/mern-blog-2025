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
                <a href="https://www.instagram.com/yuzu.wellness_/"><InstagramIcon /></a>
                <a href="https://www.pinterest.com/yuzuwellness/"><PinterestIcon /></a>
                 <a href="https://x.com/YuzuWellness"><XIcon /></a>
                 <a href="https://www.facebook.com/profile.php?id=61577953778367"><FacebookIcon /></a>
            </div>
        </div>
    )
}

export default Footer