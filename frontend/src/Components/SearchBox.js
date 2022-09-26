import React , { useState} from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {

    let navigate = useNavigate()
    const [keyWord, setKeyWord] = useState("")

    const submitHandler = (e)  => {
        e.preventDefault()
        if(keyWord.trim()){
            navigate(`/search/${keyWord}`)
        }else{
            navigate('/')
        }
    }

  return (
     <Form className="d-flex" onSubmit={submitHandler} inline>
            <FormControl
                type="search"
                name="q"
                placeholder="Search Product .."
                className="mr-sm-2  ml-sm-5 "
                value={keyWord}
                aria-label="Search"
                onChange= {(e)=>setKeyWord(e.target.value) }
            />
            <Button type="submit" id="search-btn" className='p-2' variant='outline-success'>search</Button>
        </Form>
  )
}

export default SearchBox
