import bcrypt from "bcrypt";

// definition for Users
module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        hooks: {
            beforeCreate: user => {
                // generate encrypted password
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        classMethods: {
            associate: (models) => {
                Users.hasMany(models.Tasks);
            },
            isPassword: (encodedPassword, password) => {
                return bcrypt.compareSync(password, encodedPassword);
            }
        }
    });
    return Users;
};