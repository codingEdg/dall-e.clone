import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  // apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("data is here");
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse?.data?.data[0]?.b64_json; // Add additional checks here
    if (image) {
      res.status(200).json({ photo: image });
    } else {
      throw new Error("Failed to retrieve image data");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export default router;
/*

import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });

  console.log(image.data);
}
main();


{
  "created": 1589478378,
  "data": [
    {
      "url": "https://..."
    },
    {
      "url": "https://..."
    }
  ]
}


*/
