import { SPACES } from "@/config/navigation.config";
import { useState, useEffect } from "react";

const STORAGE_KEY = "org-navigation-space";

export const useNavigationSpace = (organizationId) => {
  const storageKey = `${STORAGE_KEY}-${organizationId}`;
  
  const [currentSpace, setCurrentSpace] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved || SPACES.PERSONAL;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, currentSpace);
  }, [currentSpace, storageKey]);

  const toggleSpace = () => {
    setCurrentSpace((prev) =>
      prev === SPACES.PERSONAL ? SPACES.MANAGEMENT : SPACES.PERSONAL
    );
  };

  const setSpace = (space) => {
    if (Object.values(SPACES).includes(space)) {
      setCurrentSpace(space);
    }
  };

  return {
    currentSpace,
    isPersonalSpace: currentSpace === SPACES.PERSONAL,
    isManagementSpace: currentSpace === SPACES.MANAGEMENT,
    toggleSpace,
    setSpace,
  };
};