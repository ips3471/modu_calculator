import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 90%;
	padding: 1rem 1.5rem;
	flex-direction: column;
	align-items: center;
	position: absolute;
	border-radius: 20px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	gap: 1rem;
	background-color: rgba(0, 0, 0, 0.7);
	user-select: none;
`;

const Main = styled.div`
	text-align: center;
	font-size: 2.2rem;
	white-space: nowrap;
	padding: 1rem 0;
	.lists {
		font-size: 0.7em;
	}
	.list {
		padding: 0.2em 0;
		button {
			text-align: left;
			white-space: normal;
			display: flex;
			flex-direction: column;
			width: 100%;
			color: ${props => props.theme.color.main};
			background-color: transparent;
			.question {
				padding: 0.2em 0;
			}
			.answer {
				color: yellow;
				padding: 0.1em 0 0.3em 0;
				border-bottom: 1px solid ${props => props.theme.color.main};
			}
		}
	}
`;

const FaqBtn = styled.button<FaqStyleProps>`
	border-top: ${props =>
		props.isActive === true
			? `1px solid ${props.theme.color.main}`
			: 'none'};
`;

const Title = styled.div`
	color: ${props => props.theme.color.main};
	text-align: center;
`;

const Cancel = styled.div`
	width: 100%;
	& > button {
		width: 100%;
		background-color: #ffffff20;
		border-radius: 20px;
		padding: 0.8em 0;
		color: ${props => props.theme.color.main};
	}
`;

type HintDialogProps = {
	setHintDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FaqStyleProps {
	isActive: boolean;
}

type Qna = {
	id: number;
	question: string;
	answer: string;
	isVisible: boolean;
};
type Faq = Qna[];

function Hint({ setHintDialog }: HintDialogProps) {
	const [faq, setFaq] = useState<Faq>([
		{
			id: 1,
			question: '주요기능이 궁금합니다',
			answer: '도시카드를 길게 터치하면 도시의 소유여부를 변경하거나 도시에 축제나 올림픽 여부를 표시할 수 있습니다.',
			isVisible: false,
		},
		{
			id: 2,
			question: '도시의 가격들이 제품의 내용과 달라요',
			answer: '개발자가 직접 사용하려고 만든 앱입니다. 개발자가 임의로 밸런스 조정을 한 부분에 대해 양해를 구합니다.',
			isVisible: false,
		},
		{
			id: 3,
			question:
				'랜드마크를 땅, 별장, 빌딩, 호텔과 동시에 선택할 수 없어요',
			answer: '여기에 답변을 입력하세요',
			isVisible: false,
		},
	]);

	function toggleAnswer(qna: Qna) {
		setFaq(faq => {
			let updated = [...faq];
			const index = updated.findIndex(item => item.id === qna.id);
			if (index >= 0 && faq[index]?.isVisible === true) {
				updated[index] = { ...qna, isVisible: false };
			} else {
				updated.map(qna => {
					if (qna.isVisible === true) {
						qna.isVisible = false;
					}
				});
				updated[index] = { ...qna, isVisible: !qna.isVisible };
			}

			return updated;
		});
	}
	return (
		<>
			<Container>
				<Title>
					<h2>FAQ</h2>
				</Title>
				<Main>
					<ul className='lists'>
						{faq.map(qna => (
							<li className='list' key={qna.id}>
								<FaqBtn
									isActive={qna.isVisible}
									onClick={() => toggleAnswer(qna)}
								>
									<span className='question'>
										💠 {qna.question} <br />
									</span>
									{qna.isVisible && (
										<span className='answer'>
											↪ {qna.answer}
										</span>
									)}
								</FaqBtn>
							</li>
						))}
					</ul>
				</Main>
				<Cancel>
					<button onClick={() => setHintDialog(false)}>
						<i className='fas fa-arrow-rotate-left'></i> 이전으로
					</button>
				</Cancel>
			</Container>
		</>
	);
}

export default Hint;
