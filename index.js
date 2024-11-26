// Set global variables
var velocity = 100;
var balls = []; // Array to store ball elements

// Create a ball function
var createBall = function () {
    // Random x and y positions
    var width = window.innerWidth;
    var height = window.innerHeight;
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);

    // Ensure the ball doesn't overlap with other balls
    for (var i = 0; i < balls.length; i++) {
        var dist = Math.sqrt(Math.pow(x - balls[i].x, 2) + Math.pow(y - balls[i].y, 2));
        if (dist < 100) {  // Adjust the threshold distance if needed
            return createBall(); // If too close, try creating another ball
        }
    }

    // Random color
    var color = getRandomColor();

    // Create the div for the ball
    var div = document.createElement('div');
    div.style.zIndex = '1';
    div.style.position = 'absolute';
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.borderRadius = '50%';
    div.style.background = color;

    // Random velocity direction
    var ballVelocity = {
        x: Math.random() < 0.5 ? velocity : -velocity,
        y: Math.random() < 0.5 ? velocity : -velocity
    };

    // Append the ball to the body
    document.body.appendChild(div);

    // Add the new ball to the balls array with unique properties
    balls.push({
        element: div,  // The actual div element for the ball
        x: x,          // Ball's x position
        y: y,          // Ball's y position
        velocity: ballVelocity, // Ball's velocity
        color: color   // Ball's color
    });
};

// Function to generate a random color (RGB)
var getRandomColor = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};

// Function to move all balls
var moveBalls = function () {
    var Xmin = 0;
    var Xmax = window.innerWidth - 50; // Avoid overflow off-screen
    var Ymin = 0;
    var Ymax = window.innerHeight - 50; // Avoid overflow off-screen

    // Loop through each ball and move it
    balls.forEach(function(ball) {
        // Adjust position based on the ball's individual velocity
        ball.x += ball.velocity.x;
        ball.y += ball.velocity.y;

        // Update ball position on screen
        ball.element.style.left = ball.x + "px";
        ball.element.style.top = ball.y + "px";

        // Reverse direction if the ball hits the boundary
        if (ball.x > Xmax || ball.x < Xmin) {
            ball.velocity.x = -ball.velocity.x; // Reverse x direction
        }

        if (ball.y > Ymax || ball.y < Ymin) {
            ball.velocity.y = -ball.velocity.y; // Reverse y direction
        }

        // Optionally, change the color of the ball every time it moves
         ball.element.style.backgroundColor = getRandomColor(); // Uncomment to change color
    });
};

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Create multiple balls, for example, 5 balls
    for (var i = 0; i < 10; i++) {
        createBall(); // Add a ball to the screen
    }

    // Start the movement loop
    setInterval(moveBalls, 100); // Update all balls every 100ms
});
