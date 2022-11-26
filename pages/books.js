import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FcDocument } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import AddBook from '../components/AddBook';
import Header from '../components/Header';
import getAllBook from '../libs/getAllBook';
import { addBooks } from '../store/slice/bookSlice';


export default function Home() {
  const user = useSelector(state=> state.auth.user)
  const allBooks = useSelector(state=> state.book.books)
  const dispatch = useDispatch()
  const [search,setSearch] = useState("")
  const [add,setAdd] = useState(false)
  const [books,setBooks] = useState({})
  useEffect(()=>{
    getAllBook(user._id,dispatch,addBooks)
  },[dispatch, user._id,allBooks])
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
          <button onClick={()=>setAdd(true)}>
            <AiOutlinePlusCircle/>
            <span>ADD BOOK</span>
          </button>
        </div>
        <div className="book_list">
          <div className="search">
              <input type="search" placeholder='Search book name ...'/>
          </div>
          <div className="list">
              {
                allBooks && allBooks.map(book =><Link key={book._id} href={`/book/details/${book._id}`}>
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
        {
          add && <AddBook setAdd={setAdd}/>
        }
        <Toaster/>
      </div>
    </div>
  )
}
