import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteConfig(_id: { eq: "global-config" }) {
      title
      _rawFooterText(resolveReferences: { maxDepth: 10 })
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false);

  function handleShowNav() {
    setShowNav(true);
  }

  function handleHideNav() {
    setShowNav(false);
  }

  const data = useStaticQuery(query);
  if (!data.site) {
    throw new Error(
      'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
    );
  }

  console.log(data);

  return (
    <Layout
      {...props}
      showNav={showNav}
      siteTitle={data.site.title}
      footerText={data.site._rawFooterText}
      onHideNav={handleHideNav}
      onShowNav={handleShowNav}
    />
  );
}

export default LayoutContainer;
