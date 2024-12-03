import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        // Fetch user data from local storage or an API
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {user ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Profile;
