const CampaignServices = require('../services/campaign_services');
const { ErrorHandler } = require('../utils/error-handler');
const {
  randomNumberGenerate,
  areDatesSameIgnoringTime,
} = require('../utils/utils');
const { wrapAsync } = require('../utils/wrapAsync');

const getAllCampaigns = async (req, res) => {
  const { page = 1, limit = 10, status, searchTerm } = req.body;

  let query = {};
  if (status) {
    query.status = status;
  }
  if (searchTerm) {
    query = {
      $or: [{ userName: { $regex: searchTerm, $options: 'i' } }],
    };
  }
  console.log({ query });

  const users = await CampaignServices.getAllCampaigns(query, page, limit);

  return res.json({
    data: users,
    message: 'Users found successfully',
  });
};

const getCampaign = async (req, res) => {
  const { campaignId } = req.params;

  const campaign = await CampaignServices.getCampaignByID(campaignId);

  return res.json({
    data: campaign,
    message: 'User found successfully',
  });
};

const deleteCampaign = async (req, res) => {
  const { campaignId } = req.params;
  campaignExist = await CampaignServices.getCampaignByID(campaignId);
  if (!campaignExist) {
    throw new ErrorHandler(404);
  }

  const campaign = await CampaignServices.deleteCampaign(campaignId);

  return res.status(200).json({ data: campaign, message: 'Campaign deleted' });
};
const updateCampaign = async (req, res) => {
  const { campaignId } = req.params;
  const { status } = req.body;
  let body = {};
  if (status) {
    body.status = status;
  }
  campaignExist = await CampaignServices.getCampaignByID(campaignId);
  if (!campaignExist) {
    throw new ErrorHandler(404);
  }

  const campaign = await CampaignServices.updateCampaignByID(campaignId, body);

  return res.status(200).json({ data: campaign, message: 'Campaign updated' });
};

const CampaignController = {
  getAllCampaigns: wrapAsync(getAllCampaigns),
  getCampaign: wrapAsync(getCampaign),
  deleteCampaign: wrapAsync(deleteCampaign),
  updateCampaign: wrapAsync(updateCampaign),
};

module.exports = CampaignController;
