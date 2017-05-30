import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import ReactQuill, {Quill} from 'react-quill'
import {ImageDrop} from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.core.css'

import selectors from '../../../store/selectors'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

const quillModules = {
  toolbar: [
    [{'header': [1, 2, 3, false]}],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  imageDrop: true,
  imageResize: {}
}

const mapStateToProps = (state, ownProps) => ({
  page: selectors.page.getOne(state)(ownProps.selectedPage)
})

class PageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {page: null}
  }

  componentWillReceiveProps(nextProps) {
    const {page} = nextProps
    if (page) {
      this.setState({
        page: {...page}
      })
    }
  }

  handleChange = value => this.setState({
    page: {
      ...this.state.page,
      body: value
    }
  })

  render() {
    const {page} = this.state
    return (
      <div>
        {page &&
          <ReactQuill
            theme="snow"
            value={page.body}
            onChange={this.handleChange}
            modules={quillModules}
          />
        }
        <div className="text-right">
          <Button
            bsStyle="success"
            disabled={!page}
            onClick={this.props.handlePageSave(page)}
            style={{margin: '10px 0'}}
          >
            Update
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PageEditor)