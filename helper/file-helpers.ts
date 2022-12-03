import axios, { AxiosResponse } from "axios";
import { Endpoints } from "../constants/endpoints";
import { filesActions } from "../store/file-store";
import { AppDispatch } from "../store/index";

export const uploadFile = (file: File, next: any) => {
  const data = new FormData();
  data.append("file", file);

  return (dispatch: any) => {
    axios
      .post(Endpoints.postFile, data)
      .then((res: AxiosResponse) => {
        dispatch(getAllFiles());
        next();
      })
      .catch((err: any) => {
        console.log("Error renaming file: ", err);
      });
  };
};

export const getFile = (id: String) => {
  return (dispatch: AppDispatch) => {
    axios
      .get(`${Endpoints.getFile}/${id}`)
      .then((res: AxiosResponse) => {
        console.log(res.data);

        return res.data;
      })
      .catch((err: any) => {
        console.log("Error getting file: ", err);
      });
  };
};

export const getAllFiles = () => {
  return (dispatch: AppDispatch) => {
    axios.get(Endpoints.getFiles).then((res: AxiosResponse) => {
      dispatch(filesActions.setFiles(res.data));
    });
  };
};

export const renameFile = (id: String, newFileName: String, next?: any) => {
  const data = {
    rename_to: newFileName,
  };

  return (dispatch: any) => {
    axios
      .patch(`${Endpoints.patchFile}/${id}`, data)
      .then((res: AxiosResponse) => {
        dispatch(getAllFiles());
        next();
      })
      .catch((err: any) => {
        console.log("Error renaming file: ", err);
      });
  };
};

export const deleteFile = (id: String) => {
  return (dispatch: any) => {
    axios
      .delete(`${Endpoints.deleteFile}/${id}`)
      .then((res: AxiosResponse) => {
        dispatch(getAllFiles());
      })
      .catch((err: any) => {
        console.log("Error deleting file: ", err);
      });
  };
};
