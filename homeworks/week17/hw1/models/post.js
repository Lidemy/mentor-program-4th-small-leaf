'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Categories)
      Post.belongsTo(models.User)
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_delete: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};