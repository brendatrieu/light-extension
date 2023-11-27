import styles from './ToggleButton.module.css';

export default function ToggleButton({
  handleToggle,
  isDisabled,
}: {
  handleToggle: () => void;
  isDisabled: boolean;
}) {
  const backgroundColor = isDisabled ? 'rgb(54, 54, 54)' : 'rgb(107, 230, 36)';

  return (
    <div style={{ backgroundColor }} className={styles.toggleContainer}>
      <div className={styles.button}></div>
    </div>
  );
}
