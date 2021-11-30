import React from 'react'

const BaseLayout = ({ children }) => {
    return (
        <>
            <header></header>

            <main>
                {children}
            </main>
            
            <footer></footer>
        </>
    )
}

export default BaseLayout
