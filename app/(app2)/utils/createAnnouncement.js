import axios from "axios";
import env from "./env";

export const createAnnouncement = async (announcementData, yourAuthToken) => {
  const API_BASE_URL = env.API_BASE_URL;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/events`,
      announcementData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourAuthToken}`, // Ensure you pass the token correctly
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw error;
  }
};
