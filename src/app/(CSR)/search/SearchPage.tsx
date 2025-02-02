'use client'

import { UnsplashImage } from '@/models/unsplash-image'
import { FormEvent,useState } from 'react'
import {Form,Button,Spinner, Alert} from 'react-bootstrap'
import Image from "next/image";
import styles from './SearchPage.module.css'

export default function SearchPage(){
    const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null)
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingisError, setSearchResultsLoadingisError] = useState(false);
 
    async function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get('query')?.toString().trim();
        
        if(query){
            try{
                setSearchResults(null);
                setSearchResultsLoadingisError(false)
                setSearchResultsLoading(true)
                const response = await fetch('/api/search?query=' + query)
                const images:UnsplashImage[] = await response.json()
                setSearchResults(images)        
            }catch(error){
                console.error(error)
                setSearchResultsLoadingisError(true)
            }finally{
                setSearchResultsLoading(false)
            }
        }
    }

    return(
        <div>
            <Alert>
                This page fetches data client-side. In order to not leak API credentials, the request is sent
                a NextJS route handler taht runs on the server. This route handler then fetches the data from the Unsplash API and returns it to the client
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='search-input'>
                    <Form.Label>Search query</Form.Label>
                    <Form.Control name='query' placeholder='E.g. cats, hotdogs,...'/>
                </Form.Group>
                <Button type='submit' className='mb-3' disabled={searchResultsLoading}>
                    Search
                </Button>
            </Form>
            <div className='d-flex flex-column align-items-center'>
                {searchResultsLoading && <Spinner animation='border'/>}
                {searchResultsLoadingisError && <p>Someting went wrong. please try again</p>}
                {searchResults?.length === 0 && <p>Nothing found. Try a different query!</p>}
            </div>

            {
                searchResults &&
                <>
                    {
                        searchResults.map(image => (
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
                </>
            }
        </div>
    )
}