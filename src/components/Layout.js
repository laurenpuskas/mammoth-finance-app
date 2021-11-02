import React from 'react';

import * as style from './Layout.module.scss';

const Layout = (props) => {
  return (
    <div className={style.layout}>
      <div className={style.inner}>{props.children}</div>
    </div>
  );
};

export default Layout;
