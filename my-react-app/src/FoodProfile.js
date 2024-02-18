import React, { useState, useEffect } from 'react';

function FoodProfile(props) {
  const { username, profilePicture, friends, ingredients, savedRecipes } = props;

  // Search state and function
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered friends based on search query
  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="food-profile">
      {/* Profile picture */}
      <img src={profilePicture} alt={`${username}'s profile picture`} />

      {/* Username */}
      <h2>{username}</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search friends"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Friends list */}
      <h3>Friends</h3>
      <ul>
        {filteredFriends.map((friend) => (
          <li key={friend.id}>
            {friend.username}
          </li>
        ))}
      </ul>

      {/* Current ingredients */}
      <h3>Current Ingredients</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} ({ingredient.quantity})
          </li>
        ))}
      </ul>

      {/* Saved recipes */}
      <h3>Saved Recipes</h3>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodProfile;