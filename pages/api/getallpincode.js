import postalCodes from "../../pincode.json";
  

  export default async function handler(req, res) {
    if (req.method === 'POST') {
     return res.status(200).json(postalCodes);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }