exports.packageResponse = (data) => {
  return {
    id: data._id,
    title: data.title,
    description: data.description,
    destination: data.destination,
    duration: data.duration,
    no_of_travelers: data.no_of_travelers,
    image: data.image,
    price: data.price,
    specialty: data.specialty,
    rating: data.rating,
    status: data.status,
  };
};

exports.allPackagesResponse = (data) => {
  let response = [];

  data.map((data) => {
    response.push({
      id: data._id,
      title: data.title,
      description: data.description,
      destination: data.destination,
      duration: data.duration,
      no_of_travelers: data.no_of_travelers,
      image: data.image,
      price: data.price,
      specialty: data.specialty,
      rating: data.rating,
      status: data.status,
    });
  });

  return response;
}