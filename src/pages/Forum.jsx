import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function Forum(){
    const [post, setPost] = useState([])
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');

    // Retrieves stuff from the database, does not show it.
        
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
        
        // Allows creation of new entries into DB
        const createPost = async () => {
            const { error } = await supabase  
                .from('forum_posts')
                .insert([{title: newTitle, body: newBody}]);
            if (error) {
                console.error('Error creating post:', error);
            } else {
                setNewTitle('');
                setNewBody('');
                fetchPost();
                }
            }

        useEffect(() => {
            fetchPost();
        }, []);
        
        return(
          <div style={{ padding: '2rem 20rem', border: '1px solid #ddd' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem', gap: '10px'}}>
                <input
                    type="text"
                    placeholder="Create a title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ padding: '8px' }}
                />
                <textarea
                    type="text"
                    placeholder="Tell the community something!"
                    value={setNewBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    style={{ padding: '8px', minHeight:'100px'}}
                />
            <hr/>
            {post.map((item) => (
              <div key = {item.id} style={{border: '1px solid #ccc', marginBottom: '1rem', backgroundColor: '#ffffff', padding: '0.5rem'}}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            ))}
            </div>
          </div>
        )
}

