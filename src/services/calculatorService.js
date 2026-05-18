import axios from "axios";

const BASE_URL =  "https://smart-calculator-backend-y4j4.onrender.com";

export const testBackend = async () => {
  const res = await axios.get(`${BASE_URL}/test`);
  return res.data;
};