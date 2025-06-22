import { useState } from 'react';
import './footer.css'

const Footer = () => {
      const [year, setYear] = useState(new Date().getFullYear());
    return (
        <div>
           <p>{`© ${year}. All Rights Reserved.`}</p>
        </div>
    )
}

export default Footer