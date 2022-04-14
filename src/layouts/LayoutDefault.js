import React from 'react'
import Header from '../components/layout/Header'

const LayoutDefault = ({ children }) => {
    return (
        <>
            <Header navPosition='right' className='reveal-from-bottom' />
            <main className='site-content pad-page' style={{ backgroundColor: '#F2F8FA'}}>
                {children}
            </main>
        </>
    )
}

export default LayoutDefault  