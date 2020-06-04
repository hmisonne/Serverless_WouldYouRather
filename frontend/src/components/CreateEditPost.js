import React, { Component } from 'react';

const CreateEditPost = (props) => {
        const { body, category, title, author } = props.currPost
        const {handleSubmit, handleInputChange, handleBodyChange, categories} = props
        return (
            <div>

            <form className='new-post' onSubmit={handleSubmit}>

                  <input
                    name="title"
                    placeholder="Title"
                    type="text"
                    className='inputarea'
                    value={title}
                    onChange={handleInputChange} />
                <br />

                  <textarea
                    className='textarea'
                    placeholder="Post content..."
                    value={body}
                    onChange={handleBodyChange}
                    maxLength={280}/>
                <br />
                  <input
                    className='inputarea'
                    name="author"
                    placeholder="Author"
                    type="text"
                    value={author}
                    onChange={handleInputChange} />

                <br />
                  <select 
                  name="category" value={category} onChange={handleInputChange}>
                      <option disabled>Select Category</option>
                  {categories.map(category=> 
                    <option
                        key = {category.name} 
                        value={category.name}>{category.name}</option>
                    )}
                  </select>
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
        );
    

}



export default CreateEditPost;