import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/nft/address/${address}`
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching ERC721 balance from the server" });
  }
}
