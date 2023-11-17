exports.bookingResponse = (data) => {
  return {
    id: data._id,
    product_type: data.product_type,
    product_id: data.product_id,
    destination: data.destination,
    user: {
      id: data.user._id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      avatar: data.user.avatar,
    },
    price: data.price,
    meal_preference: data.meal_preference,
    cabin: data.cabin,
    participants: data.participants,
    status: data.status,
  };
};

exports.allBookingsResponse = (data) => {
  let response = [];

  data.map((data) => {
    response.push({
      id: data._id,
      product_type: data.product_type,
      product_id: data.product_id,
      product: {
        id: data.product.id,
        title: data.product_type === 'activity' ? data.product.activity_type : data.product.title,
        description: data.product.description,
        date: data.product.date,
        price: data.product.price,
        age_restriction: data.product_type === 'activity' ? data.product.age_restriction : null,
        status: data.product.status,
      },
      destination: data.destination,
      user: {
        id: data.user._id,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        avatar: data.user.avatar,
      },
      price: data.price,
      meal_preference: data.meal_preference,
      cabin: data.cabin,
      participants: data.participants,
      status: data.status,
    });
  });

  return response;
}