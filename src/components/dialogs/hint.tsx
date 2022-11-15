import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	min-width: 90%;
	padding: 1rem 1.5rem;
	flex-direction: column;
	align-items: center;
	position: absolute;
	border-radius: 20px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	gap: 1rem;
	background-color: rgba(0, 0, 0, 0.5);
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
			color: ${props => props.theme.color.main};
			background-color: transparent;
			.answer {
				color: yellow;
			}
		}
	}
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
			question: '여기에 질문을 입력하세요',
			answer: '여기에 답변을 입력하세요',
			isVisible: false,
		},
		{
			id: 2,
			question: '여기에 질문을 입력하세요',
			answer: '여기에 답변을 입력하세요',
			isVisible: false,
		},
		{
			id: 3,
			question: '여기에 질문을 입력하세요',
			answer: '여기에 답변을 입력하세요',
			isVisible: false,
		},
	]);

	function toggleAnswer(qna: Qna) {
		setFaq(faq => {
			let updated = [...faq];
			const index = faq.findIndex(item => item.id === qna.id);
			updated[index] = { ...qna, isVisible: !qna.isVisible };
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
								<button onClick={() => toggleAnswer(qna)}>
									{qna.id}. {qna.question}
									{qna.isVisible && (
										<div className='answer'>
											↪{qna.answer}
										</div>
									)}
								</button>
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
