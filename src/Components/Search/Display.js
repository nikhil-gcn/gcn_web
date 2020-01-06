import React from 'react'
import './DisplayStyle.css'

const Display = (props) =>{
    return(
        <>
            {props.list()}
            {props.list1()}     
        </>
    )
}

export default Display