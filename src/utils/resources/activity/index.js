const tz = require('moment-timezone');

exports.activityResponse = (data) => {
  const date = {
    date: tz.unix(data.date).tz('Asia/Kolkata').format('DD/MM/YYYY'),
    timestamp: Number(data.date),
  };

  return {
    id: data._id,
    activity_type: data.activity_type,
    destination: data.destination,
    date: date,
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
    const date = {
      date: tz.unix(data.date).tz('Asia/Kolkata').format('DD/MM/YYYY'),
      timestamp: Number(data.date),
    };

    response.push({
      id: data._id,
      activity_type: data.activity_type,
      destination: data.destination,
      date: date,
      image: data.image,
      price: data.price,
      age_restriction: data.age_restriction,
      rating: data.rating,
      status: data.status,
    });
  });

  return response;
}