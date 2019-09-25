import User from '../models/User';

class ProviderController {
  async index(req, res) {
    const provider = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar'],
    });

    return res.json(provider);
  }
}

export default new ProviderController();
