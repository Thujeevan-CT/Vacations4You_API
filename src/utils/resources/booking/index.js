exports.bookingResponse = (data) => {
  return {
    id: data._id,
    product_type: data.product_type,
    product_id: data.product_id,
    destination: data.destination,
    user: data.user,
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
      destination: data.destination,
      user: data.user,
      price: data.price,
      meal_preference: data.meal_preference,
      cabin: data.cabin,
      participants: data.participants,
      status: data.status,
    });
  });

  return response;
}