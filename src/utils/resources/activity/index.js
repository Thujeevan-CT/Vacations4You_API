exports.activityResponse = (data) => {
  return {
    id: data._id,
    activity_type: data.activity_type,
    destination: data.destination,
    image: data.image,
    price: data.price,
    rating: data.rating,
    status: data.status,
  };
};

exports.allActivitiesResponse = (data) => {
  let response = [];

  data.map((data) => {
    response.push({
      id: data._id,
      activity_type: data.activity_type,
      destination: data.destination,
      image: data.image,
      price: data.price,
      rating: data.rating,
      status: data.status,
    });
  });

  return response;
}