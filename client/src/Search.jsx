import React, { useState } from 'react'
import { Form, FormControl } from "react-bootstrap";
import './Style/Search.css'

function Search({ onSearch }) {
    const [isActive, setIsActive] = useState(false)
    const handleChange = (e) => {
        onSearch(e.target.value)
    }

    return (
        <div className='search-container'>
            <i
                className="fa fa-search search-icon"
                onClick={() => setIsActive(!isActive)}
            ></i>
            <Form
                className={`searchBar ${isActive ? "open" : "closed"}`}
                onSubmit={(e) => e.preventDefault()}>
                <FormControl
                    type="search"
                    className="me-2"
                    onChange={handleChange}
                />
            </Form>
        </div>
    )
}
export default Search;