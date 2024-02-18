

export function getIngredients(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.ingredients : []; // now you can access ingredients by index, Ex: graceIngredients[indexNumber]
  }

export function getFriends(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.usernamesOfFriends : []; // now you can access friends by index, Ex: graceFriends[indexNumber]
  }

export function getEvents(username, users) {
    const user = users.find(user => user.username === username);
    return user ? user.events : []; // now you can access friends by index, Ex: graceFriends[indexNumber]
  }