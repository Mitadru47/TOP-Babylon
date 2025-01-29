function Sidebar(){
    return(

        <div id="sidebar-component" className="component">
            
            <div id="top-info-container">

                <div id="posts-count">Total Posts: 2</div>
                <div id="users-count">Total Users: 2</div>

                <hr></hr>

            </div>

            <div id="bottom-user-buttons-container">

                <div id="user-buttons-group1">

                    <div id="my-profile-button-container">

                        <a href="">My Profile</a>

                    </div>

                    <div id="my-posts-button-container">

                        <a href="">My Posts</a>

                    </div>

                    <div id="my-comments-button-container">

                        <a href="">My Comments</a>

                    </div>

                    <br></br>

                    <div id="archived-posts-button-container">

                        <a href="">Archived Posts</a>

                    </div>

                </div>
                
                <div id="user-buttons-group2">

                    <a href="">Log out</a>

                </div>

            </div>
            
        </div>
    );
}

export default Sidebar;