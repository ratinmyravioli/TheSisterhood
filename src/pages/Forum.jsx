import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);



export default function Forum(){
        const [post, setPost] = useState([])

    // EXAMPLE QUERY: this block of text just retrieves stuff from the database, does not show it.
        useEffect(() => {
            const fetchPost = async () => {
            const {data, error} = await supabase
            .from('forum_posts')
            .select('id, title, body') // select all columns from database

            if (error) {
                console.log('Error fetching data:', error)
            } else {
                setPost(data)
            }
            }
            fetchPost()
        }, []);
        return(
          <div style={{padding: '2rem'}}> 
            {post.map((item) => (
              <div key = {item.id} style={{border: '1px solid #ccc', marginBottom: '1rem', padding: '0.5rem'}}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
    )
}