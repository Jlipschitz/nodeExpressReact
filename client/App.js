// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';
import request from './utils/request';

// other components
import Navbar from './Navbar';
import Blog from './Blog';


// this will bring this CSS file into build
import './App.css';

class App extends Component {
  state = {
    posts: [],
    date: Date.now()
  }

  componentDidMount() {
    // retrieve app initialization data once root component has mounted
    request.get('/api/post')
      .then(res =>
        this.setState({
          posts: res.data.sort((a,b) => b.createdDate - a.createdDate) // sort posts newest to oldest
        })
      ).catch(err => console.log(err));
      
      //update the date once component has mounted
      setInterval(() => {
        this.setState({
        date: Date.now()
      })
      }, 60000);
  }

  addPost = postState => {
    const postBody = {
      author: postState.author,
      title: postState.title,
      body: postState.body
    };

    request.post({
      route: '/api/post',
      body: postBody
    }).then(res => !console.log(res.data) && this.setState({
      posts: [res.data].concat(this.state.posts)
    }));
  };

  updatePost = (postState, id) => {
    const index = postState.editIndex;
    request.put({
      route: `/api/post/${this.state.posts[index]._id}`,
      body: {
        author: postState.author,
        title: postState.title,
        body: postState.body,
        createdDate: new Date()
      }
    }).then(res => {
      const newPosts = this.state.posts.slice(); // removes reference to old array (arrays are objects!)
      newPosts[index] = res.data;
      this.setState({
        posts: newPosts
      });
    });
  };

  deletePost = id =>
    request.delete(`/api/post/${id}`)
      .then(res => this.setState({
        posts: this.state.posts.filter(val => val._id !== id) // filter deleted id out of state
      }));

  render() {
    return (
      <div>
        <Navbar 
          currentDate={this.state.date}
        />
        <Blog
          posts={this.state.posts}
          addPost={this.addPost}
          updatePost={this.updatePost}
          deletePost={this.deletePost}
        />
      </div>
    );
  }
}

export default App;
