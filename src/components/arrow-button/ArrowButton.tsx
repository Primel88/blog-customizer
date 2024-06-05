import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type StateProps = {
	isOpen?: boolean;
	click?: () => void;
};

export const ArrowButton = ({ isOpen = false, click }: StateProps) => (
	<div
		onClick={click}
		role='button'
		aria-label='Открыть/Закрыть форму параметров статьи'
		tabIndex={0}
		className={clsx(styles.container, { [styles.container_open]: isOpen })}>
		<img
			src={arrow}
			alt='иконка стрелочки'
			className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
		/>
	</div>
);
