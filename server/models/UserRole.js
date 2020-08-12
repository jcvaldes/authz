import * as bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {

  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  UserRole.associate = (models) => {
    
  };

  return UserRole;
};