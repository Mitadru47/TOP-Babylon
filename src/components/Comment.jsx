function Comment(props){

    return(

        <div className="comment">
            

            <div className="comment-top">

                <div className="comment-title">{props.comment.title}</div>
                <div className="comment-body">{props.comment.body}</div>

            </div>

            <div className="comment-bottom">

                <div className="comment-info">

                    <div className="comment-author">Comment added by {props.comment.author.username}</div>

                    <div className="comment-dates">

                        <div className="comment-created">Created: {props.comment.dateCreated}</div>

                        {props.comment.dateCreated === props.comment.dateEdited ? 
                           <div className="comment-edited">Edited: {props.comment.dateEdited}</div> 
                                : <div className="comment-edited">Edited: {props.comment.dateEdited}</div>}

                        

                    </div>

                </div>
                
                <div className="comment-buttons">

                    <div className="comment-button"><a href="">View</a></div>

                    { localStorage.getItem("uid") === props.comment.author ? 
                        <div className="comment-button"><a href="">Edit</a></div> 
                            : <div className="comment-button"><a href="" disabled>Edit</a></div>}

                    { localStorage.getItem("uid") === props.comment.author ? 
                        <div className="comment-button"><a href="">Delete</a></div> 
                            : <div className="comment-button"><a href="" disabled>Delete</a></div>}

                </div>

            </div>

        </div>
    );
}

export default Comment;