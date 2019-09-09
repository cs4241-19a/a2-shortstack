const Sequalize = require('sequelize')
const Op = require('sequelize').Sequelize.Op;
const moment = require('moment');

const SQLITE_DATESTR = "YYYY-MM-DD HH:mm:ss"

class Reservation extends Sequalize.Model {}

const fetchActiveRevs = function(){
  const currentTime = moment().format(SQLITE_DATESTR);
  const actives = Reservation.findAll({
    where: {
      [Op.and]: {
        start: {
          [Op.lt]: currentTime,
        },
        end: {
          [Op.gt]: currentTime,
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
  const now = moment();
  const now_str = now.format(SQLITE_DATESTR)
  return new Promise((resolve, reject) => {
    Reservation.findAll({
      where: {
        stall: stall,
        [Op.and]: {
          start: {
            [Op.lt]: now_str,
          },
          end: {
            [Op.gt]: now_str,
          }
        }
      }
    }).then(function(result){
      if(result.length !== 0){
        reject("Stall "+stall+" is in use right now.");
      }else{
        const endTime = now.add(length, "m").format(SQLITE_DATESTR);
        Reservation.create({
          stall: stall,
          start: now_str,
          end: endTime,
          fulfilled: false,
          // name if name is truthy, null if falsey
          name: name ? name : null,
        });
        resolve("Created reservation");
        }
      })
  })
}

module.exports = {Reservation, fetchActiveRevs, makeRes}