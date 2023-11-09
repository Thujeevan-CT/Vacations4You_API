exports.userResponse = (user, token = null) => {
  return {
    user: {
      id: user._id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      avatar: user.avatar,
      status: user.status,
    },
    token: token ? token.token : null,
    expire_at: token ? token.expire_at : null,
  };
};

exports.allUsersResponse = (user) => {
  let response = [];

  user.map((user) => {
    response.push({
      id: user._id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      avatar: user.avatar,
      status: user.status,
    });
  });

  return response;
}