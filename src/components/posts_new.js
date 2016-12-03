import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { createPost } from '../actions/index';

class PostsNew extends Component {

  // option 1
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post created, navigate to the home page - option 1
        //this.context.router.push('/');

        // option 2
        browserHistory.push('/');
      })
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input name="title" type="text" className="form-control" {...title} />
          <div className="text-help">{title.touched && title.error}</div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input name="categories" type="text" className="form-control" {...categories} />
          <div className="text-help">{categories.touched && categories.error}</div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea name="content" className="form-control" {...content} />
          <div className="text-help">{content.touched && content.error}</div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-default">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'enter a username';
  }

  if (!values.categories) {
    errors.categories = 'enter categories';
  }

  if (!values.content) {
    errors.content = 'enter content';
  }

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPost }, dispatch);
}

// connect - 1st argument - mapStateToProps / 2nd argument - mapDispatchToProps
// redux-form - 1st argument - form config / 2nd argument - mapStateToProps / 3rd argument - mapDispatchToProps

export default reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, mapDispatchToProps)(PostsNew);

// user types something in... record it on application state
// state === {
//  form: {
//    PostNewForm: {
//      title: '...',
//      categories: '...',
//      content: '...'
//    }
//  }
// }
