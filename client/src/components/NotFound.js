import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound()  {
    return(
            <div className="bounds">
                <h1>Not Found</h1>
                <p>Sorry! We couldn't find the page you're looking for.</p>
                <p><Link to={'/'} >Home</Link></p>
            </div>
    )

}



