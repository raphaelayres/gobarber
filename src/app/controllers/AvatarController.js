import User from '../models/User';

class AvatarController {
  async store(req, res) {
    const { filename } = req.file;

    const user = await User.findByPk(req.userId);

    const { avatar } = await user.update({
      avatar: `${process.env.APP_URL}/users/avatar/${filename}`,
    });

    return res.json({ avatar });
  }
}

export default new AvatarController();
