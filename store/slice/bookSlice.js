import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books:[],
        currentBook : {},
        book:{},
        entries :[]
    },
    reducers: {
        addBooks:(state,action)=>{
            state.books = action.payload
        },
        currentBook:(state,action)=>{
            state.currentBook = action.payload
        },
        addBook:(state,action)=>{
            state.books = [action.payload,...state.books]
        },
        removeBook:(state,action)=>{
            state.books = state.books.filter(book => book.id!= action.payload)
            state.currentBook = {}
        },
        renameBook:(state,action)=>{
            state.currentBook = action.payload
        },
        addEntries:(state,action)=>{
            state.entries = action.payload
        },
        addEntry:(state,action)=>{
            state.entries.unshift(action.payload)
        },
        removeEntry:(state,action)=>{
           const entries =  state.entries.filter(entry=>entry._id !== action.payload)
           state.entries = entries
        },
        updatePrevEntry:(state,action)=>{
            const entries =  state.entries.filter(entry=>entry._id !== action.payload._id)
            state.entries = [action.payload,...entries]
        },
        logoutReset:(state,action)=>{
            state.books = []
            state.currentBook  = {}
            state.book = {}
            state.entries = []
        }
        
    }
})
export const {addBooks,currentBook,addBook,removeBook,renameBook,addEntries,addEntry,removeEntry,updatePrevEntry,logoutReset} = bookSlice.actions
export default bookSlice.reducer