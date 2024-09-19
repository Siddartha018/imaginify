import React from 'react'

```
/**
 * Renders a header component with a title and an optional subtitle
 * @param {Object} props - The component props
 * @param {string} props.title - The main title to be displayed
 * @param {string} [props.subtitle] - An optional subtitle to be displayed below the title
 * @returns {JSX.Element} A React fragment containing the header elements
 */
```
const Header = ({title,subtitle}:{title:string,subtitle?:string}) => {
  return (
    <>
    <h2 className='h2-bold text-dark-600'>{title}</h2>
    {subtitle&&<p className='p-16-regular mt-4'>{subtitle}</p>}
    </>
  )
}

export default Header