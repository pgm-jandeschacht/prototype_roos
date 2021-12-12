import React from 'react'

interface BaseLayoutProps {
    children: React.ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
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
