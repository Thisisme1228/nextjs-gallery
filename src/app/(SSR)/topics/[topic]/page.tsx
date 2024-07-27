import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from './TopicPage.module.css'
import {Alert} from '@/components/bootstrap'
import { Metadata } from "next";

// export const dynamicParams = false

interface PageProps {
    params: {topic: string},
    // searchParams: {[key:string]:string | string[] | undefined}
}

export function generateMetadata({params:{topic}}:PageProps):Metadata {
    return {
        title: topic
    }
}

export function generateStaticParams(){
    return ["toaster", "bush", "office"].map(topic => ({topic}))
}

export default async function Page({params:{topic}}:PageProps) {
    const  response = await await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const images:UnsplashImage[] = await response.json();
    
    return (<div>
        <Alert>
            This page use <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic 
            parameter. Pages that are not included in generatedStaticParams will be fetched & rendered on firsr access and then cached for subsequent requests(this can be disabled).
        </Alert>
        <h1>{topic}</h1>
        {
            images.map(image => (
                <Image
                    src={image.urls.raw}
                    width={250}
                    height={250}
                    alt={image.description}
                    key={image.urls.raw}
                    className={styles.image}
                />
            ))
        }
    </div>)

}