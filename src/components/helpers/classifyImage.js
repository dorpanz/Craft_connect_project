// helpers/classifyImage.js
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

export const classifyImage = async (imageElement) => {
  const model = await mobilenet.load();
  const predictions = await model.classify(imageElement);
  return predictions;
};

