document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/profiles')
        .then(response => response.json())
        .then(data => {
            const profileDetails = document.getElementById('profileDetails');
            const user = data[0]; // Assume first user for demonstration
            profileDetails.innerHTML = `
                <p>Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
                <p>Bio: ${user.bio}</p>
            `;
        });
});
