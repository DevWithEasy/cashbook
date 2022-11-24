import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Header from "../../../components/Header"
import { entryDetails } from "../../../libs/allEntryAction"

export default function EntryDetails(){
    const router = useRouter()
    const [entry,setEntry] = useState({})
    useEffect(()=>{
        entryDetails(router.query.id,setEntry)
    },[router.query.id])
    console.log(entry.history)
    return(
        <div className="entry_details">
            <Header/>
            <div className={entry.entryType === 'Credit' ? "entry border-t-green-500 " : "entry border-t-red-500"}>
                <div className="">
                    <span className={entry.entryType === 'Credit' ? 'credit' : 'debit'}>{entry.entryType}</span>
                    <span>{new Date(entry.createdAt).toDateString()}</span>
                </div>
                <p className="amount">{entry.amount}</p>
                <hr />
                <p>{entry.remark}</p>
            </div>
            <div className="details">
                <p>Chnage History</p>
                {
                    entry?.history?.length === 0 && <span className="block text-center py-10">No Changes history</span>
                }
                {
                    entry.history && <div className="">
                        {
                            entry.history.map((item,index)=><div key={index}>
                                <p className="date">{new Date(item.date).toDateString()}</p>
                                <p className="time">
                                    <span>Entry Changed</span>
                                    <span className="text-gray-400 text-xs">{new Date(item.date).toLocaleTimeString()}</span>
                                </p>
                                <div className="amount">
                                    <p>From : {item.from}</p>
                                    <p>To : {item.to}</p>
                                </div>
                                <hr />
                                <p className="reason">{item?.reason}</p>

                            </div>)
                        }
                    </div>
                }
            </div>
        </div>
    )
}