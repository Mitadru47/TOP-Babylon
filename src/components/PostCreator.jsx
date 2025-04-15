function PostCreator(props){


    return(

        <div id="post-creator">

            <div id="post-creator-header">Create a Post</div>

            <form id="post-creator-form">
                
                <div id="post-creator-top">

                    <input id="post-creator-title" name="title" placeholder="Title"/>
                    <textarea rows={4} cols={50} id="post-creator-body" name="body" placeholder="Add a post.."/>

                </div>

                <div id="post-creator-bottom">

                    <div id="post-creator-identifiers">

                        <div id="post-post-container">
                       
                            <label className="postid-label" htmlFor="postid">Associated Post ID:</label>
                            <input className="post-post" id="postid" ame="postid" defaultValue={props.postId} disabled/>

                        </div>

                        <div id="post-author-container">

                            <label className="authorid-label" htmlFor="authorid">Associated Author ID:</label>
                            <input className="post-author" id="authorid" name="authorid" defaultValue={props.authorId} disabled/>

                        </div>

                    </div>  

                    <div id="post-creator-buttons">

                        <button id="post-creator-submit-button">Submit</button>
                        <button id="post-creator-reset-button">Reset</button>

                    </div>

                </div>
                
            </form>                  

        </div>
    );
}

export default PostCreator;