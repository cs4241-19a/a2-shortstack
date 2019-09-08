const Op = require('sequelize').Sequelize.Op;

class Reservation extends Sequalize.Model {}

const getCurrentTime = function(){
  /**
   * Converts the current hours and minutes to an int
   * @returns: int - representation of current hours and minutes
   */
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (hours*100) + minutes;
}

const fetchActiveRevs = function(){
  const currentTime = getCurrentTime();
  const actives = Reservation.findAll({
    where: {
      [Op.and]: {
        start: {
          [Op.gt]: currentTime,
        },
        end: {
          [Op.lt]: currentTime,
        }
      }
    }
  });
  return actives;
}

const makeRes = function(stall, length, name){
  /**
   * Add a Reservation to the database and ensure that the stall isn't taken
   * @returns: Promise
   */
  return new Promise((resolve, reject) => {
    Reservation.findAll()
  })
}

module.exports = {Reservation, fetchActiveRevs}