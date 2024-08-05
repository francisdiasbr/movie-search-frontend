import React from 'react';
import styles from './table.module.css';

const Table = () => {
  const data = [
    { tconst: 'tt0084805', primaryTitle: 'Tootsie', year: 1982, averageRating: 7.5, numVotes: 1234 },
    { tconst: 'tt0061512', primaryTitle: 'Cool Hand Luke', year: 1967, averageRating: 8.1, numVotes: 190000 },
    { tconst: 'tt0064115', primaryTitle: 'Butch Cassidy and the Sundance Kid', year: 1967, averageRating: 8.0, numVotes: 220000 },
  ];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col" className={styles.header}>IMDb code</th>
          <th scope="col" className={styles.header}>Title</th>
          <th scope="col" className={styles.header}>Year</th>
          <th scope="col" className={styles.header}>Rating</th>
          <th scope="col" className={styles.header}>Votes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.tconst} className={styles.row}>
            <td className={styles.cell}>{item.tconst}</td>
            <td className={styles.cell}>{item.primaryTitle}</td>
            <td className={styles.cell}>{item.year}</td>
            <td className={styles.cell}>{item.averageRating}</td>
            <td className={styles.cell}>{item.numVotes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
