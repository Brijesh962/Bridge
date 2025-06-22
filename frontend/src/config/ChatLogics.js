export const getProfilePic = (loggedUser, users) => {
  try {
    const profilePic =
      users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
    return profilePic;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSender = (loggedUser, users) => {
  try {
    const sender =
      users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    return sender;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLastMessageSenderName = (sender, loggedUser) => {
  try {
    const lastMessageSenderName =
      sender._id === loggedUser._id ? "You" : sender.name;
    return lastMessageSenderName;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSenderFull = (loggedUser, users) => {
  try {
    const senderFull = users[0]._id === loggedUser._id ? users[1] : users[0];
    return senderFull;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
