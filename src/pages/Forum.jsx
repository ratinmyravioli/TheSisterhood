import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react'
import { IoChatbubble } from "react-icons/io5";
import { IoThumbsUpSharp } from "react-icons/io5";
import { IoThumbsDownSharp } from "react-icons/io5";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

export default function Forum(){
    const [post, setPost] = useState([])
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const TITLE_LIMIT = 70;
    const BODY_LIMIT = 1500;

    // Retrieves stuff from the database, does not show it.
        
        const fetchPost = async () => {
            const {data, error} = await supabase
                .from('forum_posts')
                .select('id, title, body, likes, dislikes, num_comments') // select all columns from database
                .order('id', { ascending: false });
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
        
        // Handles likes/dislikes
        const handleVote = async (id, column, currentCount) => {
            const { error } = await supabase
                .from('forum_posts')
                .update({ [column]: currentCount + 1 })
                .eq('id', id);
            
            if (error) console.error(`Error updating ${column}:`, error);
            else fetchPost();
        }


        useEffect(() => {
            fetchPost();
        }, []);
        
        return(
          <div style={{ padding: '2rem 2rem', minWidth: '45rem', maxWidth: '60rem', minHeight: '80rem', margin: '0 auto', backgroundColor: '#4b2732'}}>
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
                            minHeight: '20px',
                            maxHeight: '400px',
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
                        {isSubmitting ? '...' : '+'}
                    </button>
                </div>
                {post.map((item) => (
                    <div key = {item.id} style={{
                        borderRadius: '10px',
                        marginBottom: '0.1rem',
                        backgroundColor: '#ffffff',
                        padding: '1rem',
                        scrollbarWidth: '0',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap'}}>

                        <h2 style={{ color: '#4b2732', fontSize: '20px', wordWrap: 'break-word'}}>{item.title}</h2>
                        <p style={{ color: '#4b2732', wordWrap: 'break-word'}}>{item.body}</p>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: '#4b2732' }}>
                            <div style={iconGroupStyle} onClick={() => handleVote(item.id, 'likes', item.likes || 0)}>
                                <IoThumbsUpSharp size = {20} />
                                <span>{item.likes >0 && item.likes}</span>
                            </div>
                            <div style={iconGroupStyle} onClick={() => handleVote(item.id, 'dislikes', item.dislikes || 0)}>
                                <IoThumbsDownSharp size = {20} />
                                <span>{item.dislikes >0 && item.dislikes}</span>
                            </div>
                            <div style={iconGroupStyle}> {/* Just visual for now! */}
                                <IoChatbubble size = {20} />
                                <span>{item.num_comments >0 && item.num_comments}</span>
                            </div>
                        
                        </div>
                    </div>
                ))}
                </div>
            </div>
            )
    }

const circleButtonStyle = {
    width: '60px',
    height: '60px',
    position: 'absolute',
    right: '10px',
    bottom: '10px',
    borderRadius: '50%', // This makes it a circle
    backgroundColor: '#e69494', // Supabase Green
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'transform 0.1s ease',
}

const postBoxStyle = {
    borderRadius: '10px',
    marginBottom: '1rem',
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    wordWrap: 'break-word',
};

const iconGroupStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'opacity 0.2s',
};