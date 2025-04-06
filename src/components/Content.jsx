const maxBodyLength = 125; // Upto 125 Characters

function Content(props){
    return(

        <div className="content-card">
            
            <div className="content-card-top">

              <div className="post-author">{props.author}</div>
              <div className="post-date">{props.date}</div>

            </div>

            <div className="content-card-middle">

                <div className="post-title">{props.title}</div>
                
                <div className="post-body">
                    {props.body.length > maxBodyLength ? props.body.substring(0, maxBodyLength) + "..." : props.body}
                    
                </div>

            </div>


            <div className="content-card-bottom">

                <div className="post-buttons">

                    <div className="post-button1"><a href={"/posts/" + props.id}>View</a></div>
                    <div className="post-button1"><a href="">Comment</a></div>
                    <div className="post-button1"><a href="">Archive</a></div>

                </div>

            </div>
            
        </div>
    );
}

export default Content;