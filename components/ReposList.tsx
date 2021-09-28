import styles from "../styles/Home.module.css";

interface ReposListProps {
  repos: string[];
}

export const ReposList = ({ repos }: ReposListProps) => {
  return (
    <>
      {repos.map((repo: string) => (
        <div className={styles.card}>{repo}</div>
      ))}
    </>
  );
};
