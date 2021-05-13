import React from "react";
import Header from "./header";

import * as styles from "./layout.module.css";
import PortableText from "./portableText";

const Layout = (props) => {
  const { children, onHideNav, onShowNav, showNav, siteTitle, footerText } =
    props;
  return (
    <>
      <Header
        siteTitle={siteTitle}
        onHideNav={onHideNav}
        onShowNav={onShowNav}
        showNav={showNav}
      />
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.siteInfo}>
            <PortableText blocks={footerText} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
