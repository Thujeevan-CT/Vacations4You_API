exports.activityResponse = (data) => {
  return {
    id: data._id,
    activity_type: data.activity_type,
    destination: data.destination,
    date: data.date,
    image: data.image,
    price: data.price,
    age_restriction: data.age_restriction,
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
      date: data.date,
      image: data.image,
      price: data.price,
      age_restriction: data.age_restriction,
      rating: data.rating,
      status: data.status,
    });
  });

  return response;
}