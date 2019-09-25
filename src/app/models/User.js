import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        avatar: Sequelize.STRING,
        // avatar_url: {
        //   type: Sequelize.VIRTUAL,
        //   get() {
        //     if (this.avatar)
        //       // return `${process.env.APP_URL}/users/avatar/${this.avatar}`;
        //       return this.avatar;
        //     return null;
        //   },
        // },
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
