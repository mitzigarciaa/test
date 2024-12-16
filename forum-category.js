// Load posts from local storage
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Function to render posts
function renderPosts() {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";  // Clear existing posts

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="reply-btn" data-id="${post.id}">Reply</button>
            <button class="delete-btn" data-id="${post.id}">Delete</button>
            
            <!-- Replies section -->
            <div class="replies-section">
                <h4>Replies:</h4>
                <div class="replies">
                    ${post.replies.length > 0 
                        ? post.replies.map(reply => `<p>${reply}</p>`).join('')
                        : '<p>No replies yet.</p>'
                    }
                </div>
            </div>

            <!-- Reply form -->
            <div class="reply-form" id="reply-form-${post.id}" style="display:none;">
                <textarea placeholder="Write your reply..." class="reply-content" required></textarea>
                <button class="submit-reply" data-id="${post.id}">Submit Reply</button>
            </div>
        `;

        postList.appendChild(postDiv);
    });
}

// Event listener for creating a post
document.getElementById("post-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;

    if (!title.trim() || !content.trim()) return;  // Ensure both title and content are not empty

    const newPost = {
        id: Date.now(),  // Unique ID using timestamp
        title: title,
        content: content,
        replies: []  // Initialize with an empty replies array
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();  // Re-render the posts
    document.getElementById("post-form").reset(); // Clear the form
});

// Event listener for replying to a post or deleting a post
document.getElementById("post-list").addEventListener("click", function (e) {
    const postId = e.target.getAttribute("data-id");

    if (e.target.classList.contains("reply-btn")) {
        document.getElementById(`reply-form-${postId}`).style.display = "block";
    }

    if (e.target.classList.contains("submit-reply")) {
        const replyContent = document.querySelector(`#reply-form-${postId} .reply-content`).value;
        if (replyContent.trim() === "") return;

        const post = posts.find(p => p.id == postId);
        post.replies.push(replyContent);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();  // Re-render the posts
    }

    if (e.target.classList.contains("delete-btn")) {
        posts = posts.filter(post => post.id !== parseInt(postId)); // Remove post by ID
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();  // Re-render the posts after deletion
    }
});

// Initially render the posts
renderPosts();
