import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateDiscussion from './components/CreateDiscussion';
import DiscussionList from './components/DiscussionList';
import UserProfile from './components/UserProfile';
import FollowingList from './components/FollowingList';
import FollowersList from './components/FollowersList';
import UserList from './components/UserList';
import DiscussionDetails from './components/DiscussionDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-discussion" element={<CreateDiscussion />} />
          <Route path="/discussions" element={<DiscussionList />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/following/:userId" element={<FollowingList />} />
          <Route path="/followers/:userId" element={<FollowersList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/discussion/:discussionId" element={<DiscussionDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;