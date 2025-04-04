const API_URL = "https://jsonplaceholder.typicode.com/users";

document.addEventListener("DOMContentLoaded", function() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            // Retrieve users from sessionStorage
            const storedUsers = JSON.parse(sessionStorage.getItem('users')) || [];
            const allUsers = [...users, ...storedUsers]; // Merge API users and stored users

            const userList = document.getElementById('user-list');
            userList.innerHTML = ''; // Clear the user list before appending new users

            // Check if there are users to display
            if (allUsers.length === 0) {
                userList.innerHTML = "<li>No users found. Please add a new user.</li>";
            } else {
                allUsers.forEach(user => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${user.name}</span>`;

                    // Create the "View Details" button
                    const button = document.createElement('button');
                    button.textContent = "View Details";
                    button.onclick = () => {
                        window.location.href = `details.html?id=${user.id}`;
                    };

                    li.appendChild(button);
                    userList.appendChild(li);
                });
            }
        })
        .catch(error => console.error("Error fetching users:", error));
});
