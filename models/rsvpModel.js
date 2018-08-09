module.exports = function(sequelize, DataTypes) {
    var Hiker = sequelize.define("Hiker", {
      hikerName: DataTypes.STRING,
      numberOfHikers: DataTypes.INTEGER,
      hikerEmail: DataTypes.STRING
    });
  
    return Hiker;
  };
  