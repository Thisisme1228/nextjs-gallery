import { UnsplashUser } from "@/models/upslash-user"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import {cache} from 'react'

interface PageProps{
    params: {
        username: string
    }
}

async function getUser(username:string):Promise<UnsplashUser> {
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`)

    if(response.status === 404) notFound();

    return await response.json();
}

//const getUserCached = cache(getUser) use cache of you are not using the native fetch

export async function generateMetadata({params:{username}}:PageProps):Promise<Metadata> {
    const user = await getUser(username);
    return {
        title: [user.first_name, user.last_name].join(' ') || user.username
    }
}

export default async function Page ({params:{username}}:PageProps){
    const user = await getUser(username);

    return(<div>
        <h1>{user.username}</h1>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <a href={"https://unsplash.com/" + user.username}>Unsplash profile</a>
    </div>)
}