import { useState } from 'react';
import styles from './CopyableId.module.scss';

interface CopyableIdProps {
  id: string;
}

const CopyableId: React.FC<CopyableIdProps> = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <p
      className={`${styles.id} ${copied ? styles.copied : ''}`}
      onClick={handleCopy}
      title="Нажмите, чтобы скопировать"
    >
      <strong>ID:</strong> {id.slice(0, 4)}...{id.slice(-4)} {copied && <span className={styles.success}>скопировано!</span>}
    </p>
  );
};

export default CopyableId;
