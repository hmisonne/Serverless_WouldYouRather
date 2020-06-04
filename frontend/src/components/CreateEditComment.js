import React from 'react';

const CreateEditComment = (props) => {
        const { body } = props.currComment
        const {handleSubmit, handleBodyChange} = props
        return (
            <div>

            <form className='new-post' onSubmit={handleSubmit}>
                  <textarea
                    className='textarea'
                    placeholder="Post content..."
                    value={body}
                    onChange={handleBodyChange}
                    maxLength={280}/>
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
        );
    

}



export default CreateEditComment;