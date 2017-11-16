'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    id: DataTypes.NUMBER,
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    review: DataTypes.ARRAY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};