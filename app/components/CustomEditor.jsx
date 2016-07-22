import React, {Component} from 'react';
import { Button, ButtonGroup, ButtonToolbar,
  DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import Draft from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import the plugins
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialize the plugins
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const linkifyPlugin = createLinkifyPlugin();
const blockBreakoutPlugin = createBlockBreakoutPlugin();
const richButtonsPlugin = createRichButtonsPlugin();
const counterPlugin = createCounterPlugin();
const entityPlugin = createEntityPropsPlugin();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pull out neccesary Props
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { EditorState, ContentState } = Draft;
const { ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
  StrikethroughButton, ParagraphButton, BlockquoteButton, CodeButton,
  OLButton, ULButton, H1Button, H2Button, H3Button, H4Button, H5Button, H6Button } = richButtonsPlugin;
const { CharCounter, WordCounter, LineCounter } = counterPlugin;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Build some custom constants
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const plugins = [linkifyPlugin, blockBreakoutPlugin, richButtonsPlugin, counterPlugin, entityPlugin];
const limits = {chars: 200, words: 30, lines: 10};
const text = `This editor has counters below!
Try typing here and watch the numbers go up.

Note that the color changes when you pass one of the following limits:
- 200 characters
- 30 words
- 10 lines`;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Custom inline style buttons
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MyInlinePicButton = ({src, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown}) =>
  <Button bsSize="small" onClick={toggleInlineStyle} onMouseDown={onMouseDown} bsStyle={isActive ? 'primary' : 'default'} >
    <img height='15px' src={src} className={isActive ? 'activeImg' : 'inactiveImg'}/>
  </Button>;
const MyInlineIconButton = ({glyph, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown}) =>
  <Button bsSize="small" onClick={toggleInlineStyle} onMouseDown={onMouseDown} bsStyle={isActive ? 'primary' : 'default'} >
    <Glyphicon glyph={glyph}/>
  </Button>;
const MyInlineButton = ({ toggleInlineStyle, isActive, label, inlineStyle}) =>
  <Button bsSize="small" onClick={toggleInlineStyle} bsStyle={isActive ? 'primary' : 'default'} >
    {label}
  </Button>;
const MyInlineMenuItem = ({ toggleInlineStyle, isActive, label, inlineStyle, onSelect }) =>
  <MenuItem bsClass="small" onClick={toggleInlineStyle} onSelect={onSelect} active={isActive ? true : false} >
    {label}
  </MenuItem>;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Custom block style buttons
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MyBlockPicButton = ({src, toggleBlockType, isActive, label, blockType}) =>
<Button bsSize="small" onClick={toggleBlockType} bsStyle={isActive ? 'primary' : 'default'} >
  <img height='15px' src={src} className={isActive ? 'activeImg' : 'inactiveImg'}/>
</Button>;
const MyBlockIconButton = ({glyph, toggleBlockType, isActive, label, blockType}) =>
  <Button bsSize="small" onClick={toggleBlockType} bsStyle={isActive ? 'primary' : 'default'} >
    <Glyphicon glyph={glyph}/>
  </Button>;
const MyBlockButton = ({toggleBlockType, isActive, label, blockType}) =>
  <Button bsSize="small" onClick={toggleBlockType} bsStyle={isActive ? 'primary' : 'default'} >
    {label}
  </Button>;
const MyBlockMenuItem = ({toggleBlockType, isActive, label, blockType, onSelect}) =>
  <MenuItem bsClass="small" onClick={toggleBlockType} onSelect={onSelect} active={isActive ? true : false} >
    {label}
  </MenuItem>

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Build the custom editor class
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class CustomEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText(text)};
    this.onChange = (editorState) => this.setState({ editorState });
    this.focus = () => this.refs.editor.focus();
  }
  //  _onAlignLeftClick() {
  //   //className is public-DraftEditor-content to change text alignment
  // }
  render() {
    const size = <Glyphicon glyph="text-size" />
    const header = <Glyphicon glyph="header" />
    const font = <Glyphicon glyph="font" />
    const style = <Glyphicon glyph="pencil" />
    return (
      <div id="content">
        <h1>Draft.js Editor</h1>
        <div className="toolbar">
          <ButtonToolbar>
            <ButtonGroup>
              <BoldButton><MyInlineIconButton glyph="bold"/></BoldButton>
              <ItalicButton><MyInlineIconButton glyph="italic"/></ItalicButton>
              <UnderlineButton><MyInlinePicButton src="underline.png"/></UnderlineButton>
              <StrikethroughButton><MyInlinePicButton src="text-strike.png"/></StrikethroughButton>
              {/*<AlignLeftButton><MyInlineIconButton glyph="align-left"/></AlignLeftButton>
                <AlignCenterButton><MyInlineIconButton glyph="align-center"/></AlignCenterButton>
              <AlignRightButton><MyInlineIconButton glyph="align-right"/></AlignRightButton>*/}
              <ULButton><MyBlockIconButton glyph="list"/></ULButton>
              <OLButton><MyBlockPicButton src="ordered-list.png"/></OLButton>
              <DropdownButton bsSize="small" title={font}>
                <MenuItem eventKey="1">Times New Roman</MenuItem>
                <MenuItem eventKey="2">Arial</MenuItem>
                <MonospaceButton><MyInlineMenuItem/></MonospaceButton>
              </DropdownButton>
              <DropdownButton bsSize="small" title={size}>
                <MenuItem eventKey="8">8pt</MenuItem>
                <MenuItem eventKey="10">10pt</MenuItem>
                <MenuItem eventKey="12">12pt</MenuItem>
                <MenuItem eventKey="14">14pt</MenuItem>
                <MenuItem eventKey="18">18pt</MenuItem>
                <MenuItem eventKey="24">24pt</MenuItem>
                <MenuItem eventKey="36">36pt</MenuItem>
                <MenuItem eventKey="48">48pt</MenuItem>
              </DropdownButton>
              <DropdownButton bsSize="small" title={header}>
                <ParagraphButton><MyBlockMenuItem/></ParagraphButton>
                <BlockquoteButton><MyBlockMenuItem/></BlockquoteButton>
                <CodeButton><MyBlockMenuItem/></CodeButton>
                <H1Button><MyBlockMenuItem/></H1Button>
                <H2Button><MyBlockMenuItem/></H2Button>
                <H3Button><MyBlockMenuItem/></H3Button>
                <H4Button><MyBlockMenuItem/></H4Button>
                <H5Button><MyBlockMenuItem/></H5Button>
                <H6Button><MyBlockMenuItem/></H6Button>
              </DropdownButton>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <div className="editor" onClick={ this.focus }>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            spellCheck={true}
            plugins={plugins}
            ref="editor" />
        </div>
        <div className="stats">
          <div><CharCounter limit={limits.chars} /> characters</div>
          <div><WordCounter limit={limits.words} /> words</div>
          <div><LineCounter limit={limits.lines} /> lines</div>
        </div>
      </div>
    );
  }
}
