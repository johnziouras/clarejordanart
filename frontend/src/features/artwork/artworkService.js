import axios from "axios";

const API_URL = "/api/artwork/";

const getArtwork = async (type) => {
  const response = await axios.get(API_URL, {
    params: {
      type: type,
    },
  });
  return response.data;
};

const uploadArtwork = async (artworkData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, artworkData, config);

  return response.data;
};

const deleteArtwork = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + `:${id}`, config);

  return response.data;
};

const artworkService = {
  getArtwork,
  uploadArtwork,
  deleteArtwork,
};

export default artworkService;
