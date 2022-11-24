import Header from "../components/Header";
import {BsFacebook,BsGithub,BsYoutube} from "react-icons/bs"
import Image from "next/image";

export default function About(){
    return(
        <div className="relative flex justify-center bg-gray-300 min-h-screen pt-16 pb-4">
            <Header/>
            <div className="mx-4 p-4 md:w-8/12 bg-gray-100 rounded-md space-y-3">
                <h3 className="text-2xl font-bold text-sky-800">Open source free Application</h3>
                <div className=" text-gray-500  space-y-3">
                    <p className="">Developer try to create a project for his practice.</p>
                    <p className="">Code source : <a href="https://github.com/DevWithEasy/cashbook" target="_blank" rel="noopener noreferrer" className="text-sky-600">Github repository link</a></p>
                    <p className="text-red-500">if you feel cool give me a star in repository</p>
                </div>
                <div className="flex items-center space-x-5">
                    <p>Follow me :</p>
                    <a href="https://www.facebook.com/robiulawal688/" target="_blank" rel="noopener noreferrer" className="text-sky-600"><BsFacebook size={30}/></a>
                    <a href="https://github.com/DevWithEasy/" target="_blank" rel="noopener noreferrer" className=""><BsGithub size={30}/></a>
                    <a href="https://www.youtube.com/channel/UCP0CZggiWupYCTv4p0NDy6Q" target="_blank" rel="noopener noreferrer" className="text-red-600"><BsYoutube size={30}/></a>
                </div>
                <img src="https://scontent.fdac144-1.fna.fbcdn.net/v/t39.30808-6/300508595_154457820585851_5588283766715389779_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFF4SB18IbET9Y-8exp8xx52bRGyMUtHO3ZtEbIxS0c7TGqbsnXp6kFyUiYlDH1F_iJhabgkNd7rzC0iD4U0pFF&_nc_ohc=ScD-4KK44x4AX_h3Y3n&tn=b5x_ejsNo2UfpDws&_nc_ht=scontent.fdac144-1.fna&oh=00_AfBzRmtWpMk5kOBKcUDuxrWeb6CSV3jDCiVY8hhfZB-ReQ&oe=63840FCC" alt=""  className="rounded-md"/>
            </div>
        </div>
    )
}