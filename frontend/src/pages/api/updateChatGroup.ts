// pages/api/mintNFT.ts
import type { NextApiRequest, NextApiResponse } from "next";

const updateChatGroup= async (req: NextApiRequest, res: NextApiResponse) => {
  const { to } = req.body;

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/chatgroup`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to }),
    });

    const data = await response.json();
    res.status(response.status).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default updateChatGroup;