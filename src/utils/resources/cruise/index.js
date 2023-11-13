exports.cruiseResponse = (data) => {
  return {
    id: data._id,
    title: data.title,
    cruise_duration: data.cruise_duration,
    cruise_provider: data.cruise_provider,
    image: data.image,
    price: data.price,
    status: data.status,
  };
};

exports.allCruisesResponse = (data) => {
  let response = [];

  data.map((data) => {
    response.push({
      id: data._id,
      title: data.title,
      cruise_duration: data.cruise_duration,
      cruise_provider: data.cruise_provider,
      image: data.image,
      price: data.price,
    });
  });

  return response;
}