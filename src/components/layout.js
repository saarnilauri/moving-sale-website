import React from "react";
import Header from "./header";
import PortableText from "./portableText";
import Container from "./container";

const Layout = (props) => {
  const {
    children,
    onHideNav,
    onShowNav,
    showNav,
    siteTitle,
    footerText,
    logo,
  } = props;
  return (
    <>
      <Header
        logo={logo}
        siteTitle={siteTitle}
        onHideNav={onHideNav}
        onShowNav={onShowNav}
        showNav={showNav}
      />
      <div className="bg-white">{children}</div>
      <footer className="border-t-4 border-solid border-green-700 bg-green-200 py-20">
        <Container>
          <div className="text-sm text-center my-4 text-green-600 text-lg">
            <PortableText blocks={footerText} />
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
