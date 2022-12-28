import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { PostList } from './features/posts/postsList'
import { AddPostForm } from './features/posts/addPosts'
import { PostPage } from './features/posts/postPage'
import { EditPost } from './features/posts/editPost'
import { UsersList } from './features/users/usersList'
import { UserPage } from './features/users/userPage'
import { NotificationsList } from './features/notifications/notificationsList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={PostPage}/>
          <Route exact path="/posts/:postId/edit" component={EditPost}/>
          <Route exact path="/users" component={UsersList}/>
          <Route exact path="/users/:userId" component={UserPage}/>
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
