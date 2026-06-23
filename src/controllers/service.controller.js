const httpStatus = require('http-status');
const Service = require('../models/service.model');

const createService = async (req, res) => {
  try {
    // ربط الخدمة تلقائيًا بمعرف البائع الذي قام بتسجيل الدخول
    const serviceData = { ...req.body, seller: req.user.id };
    const service = await Service.create(serviceData);
    res.status(httpStatus.CREATED).send(service);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const { category, region } = req.query;
    const filter = { status: 'active' };

    // إضافة الفلترة إذا تم إرسالها من المشتري
    if (category) filter.category = category;
    if (region) filter.region = region;

    // جلب الخدمات المفلترة مع اسم البائع
    const services = await Service.find(filter).populate('seller', 'name');
    res.send(services);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

module.exports = {
  createService,
  getServices,
};