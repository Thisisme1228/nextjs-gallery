import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';
import {Alert} from 'react-bootstrap'

export const metadata: Metadata = {
    title: 'Dynamic Fetching',
  };


export default async function Page(){
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY,
        { cache: 'no-store' }
    )
    const image:UnsplashImage = await response.json();
    const width = Math.min(500, image.witdth) || 500
    const height = (width / image.witdth) * image.height || 500

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page <strong>fetches data dynamically</strong>. Every time you refresh the page, you get a new image from the Unsplash API.
            </Alert>
            <Image
                src={image.urls.raw}
                width={width}
                height={height}
                alt={image.description || 'static image'}
                priority={true}
                className="rounded shadow mw-100 h-100"
            />
            by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
        </div>
    )
}