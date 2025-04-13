function CommentCreator(props){


    return(

        <div id="comment-creator">

            <div id="comment-creator-header">Care to comment..</div>

            <form id="comment-creator-form">
                
                <div id="comment-creator-top">

                    <input id="comment-creator-title" name="title" placeholder="Title"/>
                    <textarea rows={4} cols={50} id="comment-creator-body" name="body" placeholder="Add a comment.."/>

                </div>

                <div id="comment-creator-bottom">

                    <div id="comment-creator-identifiers">

                        <div id="comment-post-container">
                       
                            <label className="postid-label" htmlFor="postid">Associated Post ID:</label>
                            <input className="comment-post" id="postid" ame="postid" defaultValue={props.postId} disabled/>

                        </div>

                        <div id="comment-author-container">

                            <label className="authorid-label" htmlFor="authorid">Associated Author ID:</label>
                            <input className="comment-author" id="authorid" name="authorid" defaultValue={props.authorId} disabled/>

                        </div>

                    </div>  

                    <div id="comment-creator-buttons">

                        <button id="comment-creator-submit-button">Submit</button>
                        <button id="comment-creator-reset-button">Reset</button>

                    </div>

                </div>
                
            </form>                  

        </div>
    );
}

export default CommentCreator;