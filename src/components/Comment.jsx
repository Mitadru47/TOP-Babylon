function Comment(props){

    return(

        <div id="comment-container">
            
            <div>{props.comment.title}</div>
            <div>{props.comment.body}</div>

        </div>
    );
}

export default Comment;