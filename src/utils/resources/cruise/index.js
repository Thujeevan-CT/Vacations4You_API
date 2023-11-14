const tz = require('moment-timezone');

exports.cruiseResponse = (data) => {
  const departureDate = {
    date: tz.unix(data.departure_date).tz('Asia/Kolkata').format('DD/MM/YYYY'),
    timestamp: Number(data.departure_date),
  };

  const arrivalDate = {
    date: tz.unix(data.arrival_date).tz('Asia/Kolkata').format('DD/MM/YYYY'),
    timestamp: Number(data.arrival_date),
  };
  return {
    id: data._id,
    title: data.title,
    departure_destination: data.departure_destination,
    arrival_destination: data.arrival_destination,
    departure_date: departureDate,
    arrival_date: arrivalDate,
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
    const departureDate = {
      date: tz.unix(data.departure_date).tz('Asia/Kolkata').format('DD/MM/YYYY'),
      timestamp: Number(data.departure_date),
    };
  
    const arrivalDate = {
      date: tz.unix(data.arrival_date).tz('Asia/Kolkata').format('DD/MM/YYYY'),
      timestamp: Number(data.arrival_date),
    };

    response.push({
      id: data._id,
      title: data.title,
      departure_destination: data.departure_destination,
      arrival_destination: data.arrival_destination,
      departure_date: departureDate,
      arrival_date: arrivalDate,
      cabin_class: data.cabin_class,
      cruise_duration: data.cruise_duration,
      cruise_provider: data.cruise_provider,
      image: data.image,
      price: data.price,
    });
  });

  return response;
}