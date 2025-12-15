import QueryError from "../../../utils/QueryError";
import base64 from "base-64";
import fs from "node:fs";

const checkValidImageId = (id: string) => {
  const ValidID = !!id.startsWith("NOTION-");

  console.log(ValidID);

  return ValidID;
};

const getImageFromID = (id: string) => {
  if (!checkValidImageId(id)) {
    return new Error("ID not found, please enter a valid Image ID");
  }

  try {
    //? If server located on NAS, will axios be required?
    //TODO: Replace URL with NAS URL
    //TODO: Return Image URL instead - Frontend to fetch image from URL
    // const axiosRequest = axios.get("https://localhost:1234/fetchImage", id);
    // try {
    //   const axiosRequest = {
    //     data: {
    //       image: fs.readFileSync(
    //         "/Users/rhe50/Dev/Personal/monolith-graphql/src/Stubs/Assets/369101-4k-wallpaper.jpg"
    //       ),
    //     },
    //   }; // Stubbed response
    //   console.log(axiosRequest.data.image);
    //   return ax;iosRequest.data.image
  } catch (err) {
    console.error("Error fetching Image:", err);
    return null;
  }
};

export default getImageFromID;
