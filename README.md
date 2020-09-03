# CS4241 Message Board

[Website Link](http://a2-bwhetherington.glitch.me).

This project is a simple implementation of a message board. Users may make posts to the message board under any name they wish to. At this time, it does not currently feature any proper authentication. Rather, authentication is all based on the user's IP addresses. Obviously this is not a viable solution for a production system, but it is workable for a more simplistic implementation. Users' IP addresses are used in two ways in this application:

1. IP addresses are used to track whether or not a user has liked a post. If a user has liked a post and they load the page, they will see that they have already liked the post. In addition, it is used on the server and on the client to verify ensure that a user cannot like the same post twice.

2. Furthermore, IP addresses are used to track the actual author of a post, rather than the publicly listed author. This is relevant because users whose IP addresses do not match the author of a post's IP address are unable to delete that post.

While the server uses these IP addresses, it makes sure not to expose them publicly. Internally, the server stores the IP address of the author of each post, and the list of IP addresses that have liked the post. When a user queries the server for the list of posts, the user is only told the total number of IP addresses that have liked each post, as well as whether or not they are the author of the post.

The server's state should persist across restarts, however the implementation of this was also fairly simplistic. It simply writes the state of the server to a JSON file periodically, and loads that JSON file when starting up. A more production-minded implementation of this project should use a proper database.

## Technical Achievements

- **Basic User Authentication:** Using the users' IP addresses, the server verifies whether or not a user is allowed to take certain actions, such as deleting posts.

- **Like Tracking:** Individual users may choose like any given post up to once. Using the information about the users' IP addresses, the server ensures that the like count is the number of individual IP addresses that have liked the specified post.

## Design Achievements

- **Custom CSS:** The project has a custom stylesheet for a simple and clean design.
