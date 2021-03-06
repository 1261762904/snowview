import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    fetchDocumentResult, fetchRandomQuestion,
} from './action';
import { combineReducers } from 'redux';
import { DocumentResult } from '../model';
import { show } from 'js-snackbar';
import { graph, GraphState } from './graphReducer';
import { navGraph, NavGraphState } from './navGraphReducer';
import { color, ColorState } from './colorReducer';

function showError(message: string) {
    show({
        text: message,
        pos: 'bottom-center',
        duration: 1000
    });
}

function withError<V>(message: string, value: V): V {
    showError(message);
    return value;
}

export interface DocumentResultState {
    fetching: boolean;
    query: string;
    result?: DocumentResult;
}

export interface RootState {
    fetchingRandomQuestion: boolean;
    graph: GraphState;
    navGraph: NavGraphState;
    documentResult: DocumentResultState;
    color: ColorState;
}

const fetchingRandomQuestion = reducerWithInitialState<boolean>(false)
    .case(fetchRandomQuestion.started, () => true)
    .case(fetchRandomQuestion.done, (s, p) => {
        p.params(p.result.query);
        return false;
    })
    .case(fetchRandomQuestion.failed, () => withError('Failed to get a random question', false));

const documentResult =
    reducerWithInitialState<DocumentResultState>({fetching: false, query: ''})
        .case(fetchDocumentResult.started, (state, payload) => ({fetching: true, query: payload.query}))
        .case(fetchDocumentResult.done, (state, payload) => ({
            fetching: false, query: payload.params.query, result: payload.result
        }))
        .case(fetchDocumentResult.failed, (state, payload) =>
            withError('Failed to rank', {fetching: false, query: payload.params.query}));

export const appReducer = combineReducers({
    fetchingRandomQuestion, graph, navGraph, documentResult, color
});