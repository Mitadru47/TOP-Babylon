function CommentCreator(props){


    return(

        <div id="comment-creator">

            <div id="comment-creator-header">Care to comment..</div>

            <form>
                
                <div className="comment-creator-top">

                    <input className="comment-title" name="title" placeholder="Title"/> <br></br>
                    <textarea rows={4} cols={50} className="comment-body" name="body" placeholder="Add a comment.."/>

                </div>

                <div className="comment-creator-bottom">

                    <input className="comment-post" name="title" defaultValue={props.postId} disabled/>
                    <input className="comment-author" name="title" defaultValue={props.authorId} disabled/>

                </div>

                <div className="comment-creator-buttons">

                    <button id="comment-creator-submit-button">Submit</button>
                    <button id="comment-creator-reset-button">Reset</button>

                </div>
                
                
            </form>                  

        </div>
    );
}

export default CommentCreator;