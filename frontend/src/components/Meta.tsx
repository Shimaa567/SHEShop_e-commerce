import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: React.FC<Props> = ({
  title = "Welcome to SHEShop | Home",
  description = "Find the best product for the cheapest prices",
  keywords = "Good Products, Cheap Prices, High Quality",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
