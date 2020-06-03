import React,{ useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Register from './components/register-page/register'
import StartQuizPage from './components/start-quiz-page/startPage'
import Quiz from './components/quiz/quiz'
import _404 from './components/404-page/404'

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Register/>
      </Route>
      <Route path="/start-quiz">
        <StartQuizPage/> 
      </Route>
      <Route path="/quiz">
          <Quiz/>
      </Route>
    </BrowserRouter>
  )
}

export default App;
