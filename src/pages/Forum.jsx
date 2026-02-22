import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function Forum(){
    const [post, setPost] = useState([])
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const TITLE_LIMIT = 70;
    const BODY_LIMIT = 450;

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
            if (!newTitle || !newBody) return;

            setIsSubmitting(true);
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
                setIsSubmitting(false);
            }

        useEffect(() => {
            fetchPost();
        }, []);
        
        return(
          <div style={{ padding: '2rem 2rem', maxWidth: '40rem', margin: '0 auto', backgroundColor: '#4b2732'}}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '2rem', gap: '10px'}}>
                <input
                    type="text"
                    placeholder="Create a title"
                    maxLength={TITLE_LIMIT}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ padding: '8px' , backgroundColor: '#fde8e8', borderRadius: '10px'}}
                />
                <div style={{ position: 'relative', width: '100%' }}>
                    <textarea
                        type="text"
                        placeholder="Tell the community something!"
                        maxLength={BODY_LIMIT}
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        style={{ 
                            backgroundColor: '#fde8e8',
                            padding: '15px', 
                            paddingRight: '85px',
                            boxSizing: 'border-box', 
                            minHeight: '120px',
                            maxHeight: '300px',
                            width: '100%',
                            display: 'block',
                            resize: 'vertical',
                            borderRadius: '10px'
                        }}
                    />
                    <button
                        onClick={createPost}
                        disabled={isSubmitting}
                        style={circleButtonStyle}
                    >
                        {isSubmitting ? '...' : 'Send'}
                    </button>
                </div>
                {post.map((item) => (
                <div key = {item.id} style={{
                    borderRadius: '10px',
                    marginBottom: '0.1rem',
                    backgroundColor: '#ffffff',
                    padding: '1rem'}}>
                    <h2 style={{ color: '#4b2732', fontSize: '20px'}}>{item.title}</h2>
                    <p style={{ color: '#4b2732'}}>{item.body}</p>
                </div>
                ))}
                </div>
            </div>
            )
    }

const circleButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%', // This makes it a circle
    backgroundColor: '#e69494', // Supabase Green
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    alignSelf: 'flex-end', // Aligns it to the right of the column
    transition: 'transform 0.1s ease',
}

