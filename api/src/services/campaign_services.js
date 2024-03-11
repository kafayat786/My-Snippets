const models = require('../models/index');

class CampaignService {
  async createCampaign(postData) {
    return await models.Campaigns({ ...postData }).save();
  }

  async getAllCampaigns(query, page, limit) {
    return await models.Campaigns.find({ ...query })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
  }

  async getNumberOfUsers(filter = {}) {
    return await models.Campaigns.countDocuments(filter);
  }

  async updateCampaignByID(id, updateData) {
    return await models.Campaigns.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true }
    );
  }

  async getCampaignByID(campaignId) {
    return await models.Campaigns.findOne({
      _id: campaignId,
    }).lean();
  }
  async deleteCampaign(campaignId) {
    return await models.Campaigns.deleteOne({ _id: campaignId });
  }

  async dropUserCollection() {
    await models.Campaigns.db.syncIndexes();
    await models.Campaigns.collection.drop();
  }
}

module.exports = new CampaignService();
