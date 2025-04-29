import postalCodes from "../../pincode.json";
  

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