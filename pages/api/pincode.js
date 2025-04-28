// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const postalCodes = {
      "74000": {
        city: "Karachi",
        state: "Sindh",
        country: "Pakistan",
      },
      "54000": {
        city: "Lahore",
        state: "Punjab",
        country: "Pakistan",
      },
      "44000": {
        city: "Islamabad",
        state: "Islamabad",
        country: "Pakistan",
      },
      "46000": {
        city: "Rawalpindi",
        state: "Punjab",
        country: "Pakistan",
      },
      "38000": {
        city: "Faisalabad",
        state: "Punjab",
        country: "Pakistan",
      },
      "60000": {
        city: "Multan",
        state: "Punjab",
        country: "Pakistan",
      },
      "25000": {
        city: "Peshawar",
        state: "Khyber Pakhtunkhwa",
        country: "Pakistan",
      },
      "87300": {
        city: "Quetta",
        state: "Balochistan",
        country: "Pakistan",
      },
      "51040": {
        city: "Sialkot",
        state: "Punjab",
        country: "Pakistan",
      },
      "52250": {
        city: "Gujranwala",
        state: "Punjab",
        country: "Pakistan",
      },
      "63100": {
        city: "Bahawalpur",
        state: "Punjab",
        country: "Pakistan",
      },
      "71000": {
        city: "Hyderabad",
        state: "Sindh",
        country: "Pakistan",
      },
      "22010": {
        city: "Abbottabad",
        state: "Khyber Pakhtunkhwa",
        country: "Pakistan",
      },
      "65200": {
        city: "Sukkur",
        state: "Sindh",
        country: "Pakistan",
      },
      "40100": {
        city: "Sargodha",
        state: "Punjab",
        country: "Pakistan",
      },
      "47150": {
        city: "Murree",
        state: "Punjab",
        country: "Pakistan",
      },
  };
  

  export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { pincode } = req.body;
      
      if (!pincode) {
        return res.status(400).json({ error: 'Postal code is required' });
      }
  
      const locationData = postalCodes[pincode];
      
      if (locationData) {
        return res.status(200).json(locationData);
      } else {
        return res.status(404).json({ error: 'Postal code not found' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }