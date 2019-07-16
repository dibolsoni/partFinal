import React from 'react';
import {Link} from 'react-router-dom';


export default class Forbidden extends React.Component {

    render(){

        const {location} = this.props;
        // const location_before = location.from.pathname;
        return(
                <div className="bounds">
                    <h1>Forbidden</h1>
                    <p> Oh oh! You can't access this page.</p>
                    <h2>
                        <p>
                            <Link to={
                                location.from.pathname ? 
                                    {pathname: '/signup',
                                    from: location.from.pathname}
                                :
                                    {pathname: '/signup'}
                                }
                            >Sign Up</Link> or <Link to={
                                                    location.from.pathname ? 
                                                        {pathname: '/signin',
                                                        from: location.from.pathname}
                                                    :
                                                        {pathname: '/signin'}
                                                    } >Sign In</Link></p>
                    </h2>
                    <p><Link to={'/'} >Home</Link></p>
                </div>
        )
    }
}
