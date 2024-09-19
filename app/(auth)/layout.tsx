import React from 'react'

```
/**
 * Layout component that wraps its children in a main element with 'auth' class
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the layout
 * @returns {JSX.Element} A main element containing the provided children
 */
```const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='auth'>
        {children}
    </main>
  )
}

export default Layout