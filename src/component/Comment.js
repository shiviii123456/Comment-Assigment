import React, { useEffect } from "react";
import './comment.css'
import data from "../Data/data";
import { getIntial } from "../util/getIntial";
import personData from "../Data/personData";
import Modal from "./modal/Modal";

const Comment = () => {
    const [state, setState] =  React.useState([]);
    const [comment, setComment] = React.useState("");
    const [tags, setTags] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const currentUser = "Shivangi Singh"

    useEffect(() => {
        const getData = () => {
            const comments = data.comments;
            const commentData = comments.map((comment) => {
                return {...comment, initals: getIntial(comment.updatedBy)}
            });

            setState(commentData);
        }
        getData();
    }, []);


    const addComment = () => {
        if(comment === ""){
            return ;
        }

        const commentBody = {
            updatedBy: currentUser, 
            comment, 
            taggedTo: tags,  
            updatedOn: "2022-08-11T09:18:10.123Z", 
            initals: getIntial(currentUser)
        };

        setState((prev) => [commentBody, ...prev]);
        setComment("");
        setTags([]);

    }

    const onTagClick = (eventName, event, name) => {

        if(eventName === 'selectAll'){
            if(event.target.checked === true){
                setTags(personData);
            }
            else{
                setTags([]);
            }

            return;
        }

        if(event.target.checked === true){
            setTags((prev) => [...prev, name]);
        }
        else{
            const newTags = tags.filter((tag) => tag!== name);
            setTags(newTags);
        }
    }

    return (
        <div className="container">
            <Modal onModalClose={setModalOpen} isOpen={modalOpen}>
                <div className="tags_combine">
                    <input type="checkbox" checked={tags.length > 2}  onChange={(event) => onTagClick("selectAll", event)}/>
                    <div>Select ALL</div>
                </div>
                

                {personData.map((person, index) => (
                    <div className="tags_combine" key={index}>
                        <input type="checkbox" checked={tags.includes(person)} onChange={(event) => onTagClick("check", event, person)}/>
                        <div>{person}</div>
                    </div>
                    
                ) )}
            </Modal>
            <div class="block">
                <div class="block-header">
                    <h2>Comments</h2>
                    <div class="tag">{state.length}</div>
                </div>
                <div className="line"></div>
                <div class="writing">
                    <input type="text" placeholder="Enter a comment here" className="input-text" 
                    value={comment} 
                    onChange={(event) => setComment(event.target.value)}
                    />

                    <div class="tagbtn_combine">
                        <div className="tag_container">
                            {tags.map((tag, index) => <div className="tag-btn" key={index}>@{tag}</div>)}
                        </div>

                        <div className="btn_combine">
                        
                            <div className="btn__main">
                                <button className="btn" onClick={() => setModalOpen(true)}>Add Tags</button>
                            </div>

                            <div className="btn__main">
                                <button className="btn" onClick={() => addComment()}>Send</button>
                            </div>
                        </div>

                    </div>
                    
                   
                </div>
                {state.map((data, index)=>
                    <div class="comment" key={index}>
                    <div class="user-banner">
                        <div class="user">
                            <div className="avatar">
                                <h3>{data.initals}</h3>
                            </div>
                            <h5>{data.updatedBy}</h5>
                        </div>
                    </div>
                    <div class="content">
                        <p>{data.comment}</p>
                    </div>

                    <div className="tag_container">
                        {data.taggedTo.map((tag, index) => <div className="tag" key={index}>@{tag}</div>)}
                    </div>
                    <div className="border"></div>
                </div>
                )}
        </div>
        </div>

    )
}
export default Comment;