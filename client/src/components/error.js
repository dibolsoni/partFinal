import React from 'react';
import {Link} from 'react-router-dom';


export default class error extends React.Component {

    render(){

        const {from} = this.props.location;
        return(
                <div className="bounds">
                    <h1>Internal Error</h1>
                    <p> Sorry! We just encountered an unexpected error.</p>
                    <h2>
                        <p>
                            <Link to={
                                from ? 
                                    {pathname: '/signup',
                                    from: from.pathname}
                                :
                                    {pathname: '/signup'}
                                }
                            >Sign Up</Link> or <Link to={
                                                    from ? 
                                                        {pathname: '/signin',
                                                        from: from.pathname}
                                                    :
                                                        {pathname: '/signin'}
                                                    } >Sign In</Link></p>
                    </h2>
                    <p><Link to={'/'} >Home</Link></p>
                </div>
        )
    }
}