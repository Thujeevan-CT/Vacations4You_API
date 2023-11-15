exports.cruiseResponse = (data) => {
  return {
    id: data._id,
    title: data.title,
    description: data.description,
    departure_destination: data.departure_destination,
    arrival_destination: data.arrival_destination,
    departure_date: data.departure_date,
    arrival_date: data.arrival_date,
    cabin_class: data.cabin_class,
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
      description: data.description,
      departure_destination: data.departure_destination,
      arrival_destination: data.arrival_destination,
      departure_date: data.departure_date,
      arrival_date: data.arrival_date,
      cabin_class: data.cabin_class,
      cruise_duration: data.cruise_duration,
      cruise_provider: data.cruise_provider,
      image: data.image,
      price: data.price,
    });
  });

  return response;
}