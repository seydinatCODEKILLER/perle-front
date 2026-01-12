import { prepareMultipartData } from "@/shared/utils/form-data.utils";

export const transformOrganizationData = (data) => {
  const { logo, ...otherData } = data;

  const apiData = {
    ...otherData,
    ...(logo && { logo }),
  };

  return prepareMultipartData(apiData, ['logo']);
};
