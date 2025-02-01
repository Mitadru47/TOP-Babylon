function Content(props){
    return(

        <div className="content-card">
            
            <div className="content-card-top">

              <div className="post-author">{props.author}</div>
              <div className="post-date">{props.date}</div>

            </div>

            <div className="content-card-middle">

                <div className="post-title">{props.title}</div>
                <div className="post-body">{props.body}</div>

            </div>


            <div className="content-card-bottom">

                <div className="post-buttons">

                    <div className="post-button1"><a href="">View</a></div>
                    <div className="post-button1"><a href="">Comment</a></div>
                    <div className="post-button1"><a href="">Archive</a></div>

                </div>

            </div>
            
        </div>
    );
}

export default Content;