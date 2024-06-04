import { useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

interface CustomCSSProperties extends React.CSSProperties {
	'--font-family'?: string;
	'--font-size'?: string;
	'--font-color'?: string;
	'--container-width'?: string;
	'--bg-color'?: string;
}

export const App = () => {
	const [defaultState, setDefaultState] = useState(defaultArticleState);

	const styleVariables: CustomCSSProperties = {
		'--font-family': defaultState.fontFamilyOption.value,
		'--font-size': defaultState.fontSizeOption.value,
		'--font-color': defaultState.fontColor.value,
		'--container-width': defaultState.contentWidth.value,
		'--bg-color': defaultState.backgroundColor.value,
	};

	return (
		<main className={styles.main} style={styleVariables}>
			<ArticleParamsForm changeSettings={setDefaultState} />
			<Article />
		</main>
	);
};
