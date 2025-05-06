import axios from "axios";

const API_URL = "/api/artwork/";

const getArtwork = async (paramObj) => {
  const response = await axios.get(API_URL, paramObj);
  return response.data;
};

const getArtworkById = async (id) => {
  const response = await axios.get(API_URL, {
    params: {
      id: id,
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
  getArtworkById,
  uploadArtwork,
  deleteArtwork,
};

export default artworkService;
