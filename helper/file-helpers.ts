import axios, { AxiosResponse } from "axios";
import { Endpoints } from "../constants/endpoints";
import { filesActions } from "../store/file-store";
import { AppDispatch } from "../store/index";

import { _getAllFiles, _uploadFile } from "../pages/api/files";

export const uploadFile = (
  userId: string,
  file: File,
  key = "key",
  next: any
) => {
  return (dispatch: AppDispatch) => {
    _uploadFile(userId, file, key).then((data) => {
      dispatch(getAllFiles());
      next && next();
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

export const getAllFiles = (userId: string = "1") => {
  return (dispatch: AppDispatch) => {
    _getAllFiles(userId).then((data) => {
      dispatch(filesActions.setFiles(data));
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
