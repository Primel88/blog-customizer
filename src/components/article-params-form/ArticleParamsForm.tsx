import { SyntheticEvent, useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import {
	fontColors,
	contentWidthArr,
	backgroundColors,
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ChangeSettings = (newSettings: typeof defaultArticleState) => void;

export const ArticleParamsForm = ({
	changeSettings,
}: {
	changeSettings: ChangeSettings;
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [buttonState, setButtonState] = useState(0);
	const [fontState, setFontState] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeState, setFontSizeState] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColorState, setFontColorState] = useState(
		defaultArticleState.fontColor
	);
	const [backgroundColorState, setBackgroundColorState] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidthState, setContentWidthState] = useState(
		defaultArticleState.contentWidth
	);
	const sidebarRef = useRef(null);

	const resetFormHandler = () => {
		changeSettings(defaultArticleState);
		setFontState(defaultArticleState.fontFamilyOption);
		setFontSizeState(defaultArticleState.fontSizeOption);
		setFontColorState(defaultArticleState.fontColor);
		setBackgroundColorState(defaultArticleState.backgroundColor);
		setContentWidthState(defaultArticleState.contentWidth);
	};

	const submitHandler = (event: SyntheticEvent) => {
		event.preventDefault();
		changeSettings({
			fontFamilyOption: fontState,
			fontColor: fontColorState,
			backgroundColor: backgroundColorState,
			contentWidth: contentWidthState,
			fontSizeOption: fontSizeState,
		});
	};

	const formClickHandler = (event: SyntheticEvent) => {
		event.stopPropagation();
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: sidebarRef,
		onClose: () => setButtonState(buttonState + 1),
		onChange: () => {
			if (buttonState === 1) {
				setIsMenuOpen(false);
				setButtonState(0);
			}
		},
	});

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				click={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onClick={formClickHandler}
					onSubmit={submitHandler}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={fontState}
						options={fontFamilyOptions}
						onChange={setFontState}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={fontSizeState}
						options={fontSizeOptions}
						onChange={setFontSizeState}
					/>
					<Select
						title='Цвет шрифта'
						selected={fontColorState}
						options={fontColors}
						onChange={setFontColorState}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={backgroundColorState}
						options={backgroundColors}
						onChange={setBackgroundColorState}
					/>
					<Select
						title='Ширина контента'
						selected={contentWidthState}
						options={contentWidthArr}
						onChange={setContentWidthState}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetFormHandler} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
