import React from 'react';

import * as style from './Table.module.scss';

const Table = (props) => {
  return (
    <table className={style.table}>
      <caption>Mammoth Finance Repo Data</caption>
      <thead>
        <tr>
          <th scope="col">Epic</th>
          <th scope="col">Open</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{props.authLabel}</th>
          <td>{props.authIssuesOpen.length}</td>
          <td>{props.authIssuesTotal.length}</td>
        </tr>
        <tr>
          <th scope="row">{props.paymentsLabel}</th>
          <td>{props.paymentsIssuesOpen.length}</td>
          <td>{props.paymentsIssuesTotal.length}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
