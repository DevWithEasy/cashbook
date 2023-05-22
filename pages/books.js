import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FcDocument } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import AddBook from '../components/AddBook';
import Header from '../components/Header';
import { addBooks } from '../store/slice/bookSlice';
import axios from 'axios';


export default function Home() {
  const {user,random} = useSelector(state=> state.auth)
  const allBooks = useSelector(state=> state.book.books)
  const dispatch = useDispatch()
  const [search,setSearch] = useState("")

  const getAllBook =async()=>{
    try{
      const res = await axios.get(`/api/book/all/${user?._id}`)
      if(res.data.data){
        dispatch(addBooks(res.data.data))
      }
    }catch(err){
      console.log(err.message)
    }
}

  useEffect(()=>{
    getAllBook()
  },[random])
  return (
    <div className=''>
      <Head>
        <title>CashBook Application</title>
        <meta name="description" content="CashBook is the no a cash maintain app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='index'>
        <Header/>
        <div className="add_book">
          <AddBook/>
        </div>
        <div className="book_list">
          <div className="search">
              <input type="search" placeholder='Search book name ...' onChange={(e)=>setSearch(e.target.value.toLocaleLowerCase())}/>
          </div>
          <div className="list">
              {
                allBooks && allBooks.filter(book=> book.name.toLowerCase().includes(search)).map(book =><Link key={book._id} href={`/book/details/${book._id}`}>
                  <a>
                    <div key={book._id} className="book">
                      <FcDocument size={25} className=""/>
                      <div className="">
                        <p className='name'>{book?.name}</p>
                        <p className="date">Created at : {new Date(book?.createdAt).toDateString()}</p>
                      </div>
                    </div>
                  </a>
                </Link>)
              }
          </div>
        </div>
        <Toaster/>
      </div>
    </div>
  )
}
