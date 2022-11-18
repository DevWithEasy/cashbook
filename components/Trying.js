export default function Trying({text}){
    return(
        <div className="flex items-center space-x-1">
            <p className="animate-spin h-5 w-5 rounded-full border-4 border-gray-300 border-b-green-500 border-l-green-500 border-t-green-500"></p>
            <p className="font-bold font-mono">{text} ...</p>
        </div>
    )
}