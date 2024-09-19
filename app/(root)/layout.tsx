
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

/**
 * Layout component that wraps the main content of the application
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout
 * @returns {JSX.Element} A layout structure containing a sidebar, mobile navigation, and main content area
 */
const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='root'>
        <Sidebar/>
        <MobileNav/>
        <div className="root-container">
            <div className="wrappper">
            {children}
            </div>
        </div>
    </main>
  )
}

export default Layout