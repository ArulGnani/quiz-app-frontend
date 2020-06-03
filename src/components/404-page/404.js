import React,{ useState } from 'react'
import { Redirect } from 'react-router-dom'
import './style/404.css'

const PageNotFound = () => {
    const [home,toHome] = useState(false)

    if (home) { return ( <Redirect to="/"/>  ) }

    return (
        <main id="err-page">
            <h1 id="err-msg"> your not authericed... </h1>
            <button 
                onClick={() => toHome(true)}
                id="btn"
            > 
                home 
            </button>
        </main>
    )
}   

export default PageNotFound
