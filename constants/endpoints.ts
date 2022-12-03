const BACKEND_URL = process.env.REACT_APP_BACKEND ?? "http://localhost:8001";

export const Endpoints = {
  backendUrl: BACKEND_URL,

  postFile: `${BACKEND_URL}/api/file`,
  getFile: `${BACKEND_URL}/api/file`,
  getFiles: `${BACKEND_URL}/api/files`,
  patchFile: `${BACKEND_URL}/api/file`,
  deleteFile: `${BACKEND_URL}/api/file`,
};
