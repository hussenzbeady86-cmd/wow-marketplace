const http = require('http');

// بيانات خدمة WoW حقيقية جاهزة للإرسال إلى السيرفر
const serviceData = JSON.stringify({
  title: "WoW Retail Gold - 500,000 Gold",
  description: "Fast and safe gold delivery on EU-Kazzak horde side. Face-to-face or guild bank deposit.",
  price: 35.50, // السعر بالدولار
  category: "Gold",
  seller: "60d5ec49f83d731128e0f1a4" // معرّف وهمي للبائع مؤقتاً لتخطي الـ Validation
});

const options = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/v1/services', // مسار الـ Route الحقيقي للخدمات
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': serviceData.length
  }
};

// إرسال الطلب إلى السيرفر المستقر لديك الآن
const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('\n================ SERVER RESPONSE ================');
    console.log('Status Code:', res.statusCode);
    console.log('Response Data:', JSON.parse(data));
    console.log('=================================================\n');
  });
});

req.on('error', (error) => {
  console.error('Error connecting to server:', error);
});

req.write(serviceData);
req.end();