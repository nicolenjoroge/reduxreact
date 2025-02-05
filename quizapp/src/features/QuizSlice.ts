import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"

interface Questions {
    id: number,
    question: string,
    options: string[],
    correctAnswer: string,
    selectedAnswer?: string
}

interface QuestionsState {
    questions: Questions[],
    currentQuestionIndex: number,
    score: number,
    status: 'idle'|'loading'|'failed'
}

const initialState: QuestionsState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    status: 'idle'
}

const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async() => {
    const response = await axios.get(API)
    const data = await response.json()

    return data.results.map((q: any, index: number) => ({
        id: index + 1,
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        correctAnswer: q.correct_answer,
    }))

})

const quizSlice = createSlice({
    name:"quiz",
    initialState,
    reducers:{
        selectAnswer: (state, action: PayloadAction<string>) => {
            const currentQuestion = state.questions[state.currentQuestionIndex]
            if (currentQuestion) {
                currentQuestion.selectedAnswer = action.payload
                if(action.payload === currentQuestion.correctAnswer) {
                    state.score += 1
                }
            }
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1
            }
        },
        resetQuiz: (state) => {
            state.currentQuestionIndex = 0
            state.score = 0
            state.questions = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = "idle"
                state.questions = action.payload
            })
            .addCase(fetchQuestions.rejected, (state) => {
                state.status = "failed"
            })
    }
})

export const {selectAnswer, nextQuestion, resetQuiz} = quizSlice.actions
export default quizSlice.reducer