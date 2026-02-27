// components/layout/withMobileBackButton.jsx

import { PageWithBackButton } from "./PageWithBackButton";

/**
 * HOC pour ajouter automatiquement le bouton retour mobile
 */
export const withMobileBackButton = (Component, options = {}) => {
  return (props) => {
    const { showBackButton = true, backTo } = options;

    return (
      <PageWithBackButton showBackButton={showBackButton} backTo={backTo}>
        <Component {...props} />
      </PageWithBackButton>
    );
  };
};